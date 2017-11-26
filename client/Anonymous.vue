<template>
  <div class="row">
    <div class="col-md-12">
     <h2>Bienvenido a Cultiva</h2>
      <h3>Tu vida está por hacerse más saludable</h3>
      <button class="btn btn-primary"
        @click="login"
      >Empecemos</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { userService } from "./core/user.service";

@Component({})
export default class Anonymous extends Vue {
  mounted() {
    console.log("mounted");
  }

  login() {
      userService.signinRedirect();
  }
}
</script>
