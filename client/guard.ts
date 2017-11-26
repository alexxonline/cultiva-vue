import { Route } from 'vue-router';
import { userService } from './core/user.service'; 

export default function guard(to: Route, from: Route, next: Function) {
    userService.isLoggedIn()
        .then(isLoggedIn => validateLogin(isLoggedIn, to, next));
}

function validateLogin(isLoggedIn:boolean, to: Route, next: Function) {
    if(!isLoggedIn && to.path !== "/anonymous")
        next("/anonymous");
    else
        next();
}