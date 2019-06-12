import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"
import About from "./views/About.vue"
import Auth from "./views/Auth.vue"
import store from "./store"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(to,from,next){
        if(store.getters.isAuth){
          next();
        }else{
          next("/auth");
        }
      }
    },
    {
      path: "/about",
      name: "about",
      component : About,
      beforeEnter(to,from,next){
        if(store.getters.isAuth){
          next();
        }else{
          next("/auth");
        }
      }
    },
    {
      path: "/auth",
      name: "auth",
      component : Auth
    },
    {
      path: "*",
      name: "redirect",
      redirect: "/"
    }
  ]
})
