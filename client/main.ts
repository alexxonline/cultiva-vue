import Vue from 'vue';
import VueRouter from 'vue-router';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
import guard from './guard';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => guard(to, from, next));

const AppConstructor = Vue.extend(App);

new AppConstructor(
{
    el: "#app",
    router
});

let nav = document.getElementById("nav");
if(nav)
    nav.style.visibility = "visible";
