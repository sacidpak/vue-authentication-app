<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>
<script>
  import Header from "./components/Header";
  import Auth from "./views/Auth"
  import Home from "./views/Home"
  import About from "./views/About"
  export default {
    components: {
        Header
    },
    created(){
      this.$store.dispatch("initAuth")
    }
  }
</script>
