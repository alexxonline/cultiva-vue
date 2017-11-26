<template>
  <div id="app">
       <nav class="navbar navbar-expand-lg navbar-light bg-light" id="nav" style="visibility: hidden">
            <router-link class="navbar-brand" to="/">
                <img src="dist/www/images/logo_cultiva.png" alt="Cultiva" />
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">Inicio
                            <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                </ul>
                <a @click="logout" href="#" v-if="isLoggedIn">Cerrar sesión</a>
            </div>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { userService } from "./core/user.service";

@Component({})
export default class App extends Vue {
    isLoggedIn:boolean = false;

    mounted() {
      userService.isLoggedIn()
        .then(isLoggedIn => this.isLoggedIn = isLoggedIn);
    }

  logout() {
    userService.logout();
  }
}
</script>
