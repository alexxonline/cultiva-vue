<template>
  <div class="row">
    <div class="col-md-12">
      <OrchardList></OrchardList>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OrchardList from "./assistant/components/OrchardList.vue";

//import HeroList from './components/HeroList.vue';
@Component({
  components: { OrchardList}
})
export default class Dashboard extends Vue {
  title: string;
  constructor() {
    super();
    this.title = "Cultiva";
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>