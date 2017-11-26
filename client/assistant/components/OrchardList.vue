<template>
  <div>
      <h3>Estas son tus huertas</h3>
      <router-link to="/add" class="btn btn-primary">Agregar</router-link>
      <img src="dist/www/images/cultiva_loading_micro.gif" alt="Cargando" v-if="loading" />
      <ul class="list-group">
        <li class="list-group-item" v-for="(orchard, index) in orchards" :key="index">
          <router-link v-bind:to="'edit/'+orchard.orchardId">{{orchard.name}}</router-link>
        </li>
      </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Orchard } from "../orchard";
import { orchardService } from "../orchard.service";

@Component({

})
export default class OrchardList extends Vue {
  loading = true;
  orchards: Orchard[] = new Array();
  mounted() {
    orchardService.list()
      .then(results => this.readOrchards(results));
  }

  readOrchards(orchards:Orchard[]){
    this.loading = false;
    this.orchards = orchards;
  }
}
</script>

