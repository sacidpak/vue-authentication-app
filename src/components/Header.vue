<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
    <router-link
    to="/"
    tag="a"
    class="navbar-brand"
    >Home</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link
        tag="li"
        class="nav-item"
        to="/about"
        >
        <a class="nav-link">About</a>
        </router-link>
        <router-link
        tag="li"
        class="nav-item"
        to="/auth"
        >
        <a class="nav-link">Sign In</a>
        </router-link>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
        <li class="nav-item">
          <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    },
    computed: {
      logoutClass() {
        return {
          'd-none': !this.$store.getters.isAuth
        }
      }
    }
  }
</script>
