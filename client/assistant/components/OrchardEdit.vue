<template>
  <div>
    <div class="row">
        <div class="col-md-12">
            <h2 v-if="isNewOrchard">Agregar huerta</h2>
            <h2 v-if="!isNewOrchard">Editar huerta</h2>
            <div v-if="!isNewOrchard">Huerta número {{ $route.params.id }}</div>
        </div>
    </div>
    <div class="row" v-if="editingOrchard != null">
        <div class="col-md-6">
            <div class="form-group">
                <label>Nombre de la huerta</label>
                <input class="form-control" v-model="editingOrchard.name" ref="name">
            </div>
            <div class="form-group">
                <label>Ubicación</label>
                <div class="input-group">
                    <input class="form-control" v-model="editingOrchard.location">
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" type="button" @click="getLocation">Obtener</button>
                    </span>
                </div>
            </div>
            <div class="form-group">
                <div><label>Tipo de huerta</label></div>
                <div class="btn-group">
                    <label class="btn btn-secondary" v-bind:class="{active:editingOrchard.orchardType == 1}">
                        <input type="radio" name="orchardType" id="floor" autocomplete="off" checked v-model.number="editingOrchard.orchardType" value="1">Suelo
                    </label>
                    <label class="btn btn-secondary" v-bind:class="{active:editingOrchard.orchardType == 2}">
                        <input type="radio" name="orchardType" id="pot" autocomplete="off" v-model.number="editingOrchard.orchardType" value="2">Maceta
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div><label>Orientación</label></div>
                <div class="btn-group">
                    <label class="btn btn-secondary" v-bind:class="{active:editingOrchard.orientation == 1}">
                        <input type="radio" name="orientation" id="horizontal" autocomplete="off" checked v-model.number="editingOrchard.orientation" value="1">Horizontal
                    </label>
                    <label class="btn btn-secondary" v-bind:class="{active:editingOrchard.orientation == 2}">
                        <input type="radio" name="orientation" id="vertical" autocomplete="off" v-model.number="editingOrchard.orientation" value="2">Vertical
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div><label>¿Donde se encuentra?</label></div>
                <div class="btn-group">
                    <label class="btn btn-secondary" v-bind:class="{active:editingOrchard.insideOutside == 1}">
                        <input type="radio" name="insideOutside" id="inside" autocomplete="off" checked v-model.number="editingOrchard.insideOutside" value="1">Interior
                    </label>
                    <label class="btn btn-secondary" v-bind:class="{active:editingOrchard.insideOutside == 2}">
                        <input type="radio" name="insideOutside" id="outside" autocomplete="off" v-model.number="editingOrchard.insideOutside" value="2">Exterior
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div><label>¿Tiene animales?</label></div>
                <div class="btn-group">
                    <label class="btn btn-secondary" v-bind:class="{active:!editingOrchard.strayAnimals}">
                        <input type="radio" name="insideOutside" id="noAnimals" autocomplete="off" 
                         v-model="editingOrchard.strayAnimals"  :value="false"
                        >No
                    </label>
                    <label class="btn btn-secondary" v-bind:class="{active:editingOrchard.strayAnimals}">
                        <input type="radio" name="insideOutside" id="yesAnimals" autocomplete="off"
                            v-model="editingOrchard.strayAnimals"  :value="true"
                        >Si
                    </label>
                </div>
            </div>
        </div>

    </div>
    <div class="row">
        <div class="col-md-12">
            <button class="btn btn-primary" type="button" @click="save">Guardar</button>
            <router-link to="/">Volver</router-link>
            </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import VueRouter, { Route } from "vue-router";
import { orchardService } from "../orchard.service";
import { locationService } from "../../core/location.service";
import { Orchard } from "../orchard";

@Component({})
export default class OrchardEdit extends Vue {
  $router: VueRouter;
  $route: Route;
  orchard: Orchard | null = null;
  isNewOrchard = !this.orchard;
  editingOrchard: Orchard | null = null;
  orchardTypeString = "2";

  $refs: {
    name: HTMLElement;
  };

  constructor() {
    super();
    
  }

  mounted() {
    if (this.$route.params.id != null) {
      let id = parseInt(this.$route.params.id);
      orchardService.get(id).then(orchard => this.readOrchard(orchard));
      this.isNewOrchard = false;
    } else {
      this.editingOrchard = new Orchard();
    }
    window.setTimeout(() => {
      this.$refs.name.focus();
    }, 100);
  }

  readOrchard(orchard: Orchard) {
    this.orchard = orchard;
    this.editingOrchard = this.getOrchardClone();
  }

  getOrchardClone() {
    return Object.assign({ orchardTypeString: "2" }, this.orchard);
  }

  getLocation() {
      locationService.getLocation()
        .then(position => {
            this.handlePositionReceived(position);
        })
  }

  handlePositionReceived(position:Position) {
      if(this.editingOrchard != null){
          this.editingOrchard.latitude = position.coords.latitude;
          this.editingOrchard.longitude = position.coords.longitude;
           locationService.translateLocation(position.coords.latitude, position.coords.longitude)
            .then(cityName =>{if(this.editingOrchard != null) this.editingOrchard.location = cityName; });
      }

     
  }

  save() {
    this.orchard;
    if(this.isNewOrchard){
        orchardService.add(this.editingOrchard as Orchard)
            .then(() => this.$router.push({path: "/"}));
    }
    else {
        orchardService.update(this.editingOrchard as Orchard)
            .then(() => this.$router.push({path: "/"}));
    }
  }
}
</script>

<style>

</style>
