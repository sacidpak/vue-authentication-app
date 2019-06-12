import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import router from "./router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token : "",
    fireBaseApiKey: "AIzaSyBLqwGDOc72XpaPsVio3RiTfP-NRkkRE4M"
  },
  getters : {
    isAuth(state){
      return state.token !== ""
    }
  },
  mutations: {
    setToken(state,token){
      state.token = token
    },
    clearToken(state){
      state.token = ""
    }
  },
  actions: {
    initAuth({commit,dispatch}){
      let token = localStorage.getItem("token")
      if(token){
        let expiretionDate = localStorage.getItem("expiretionDate")
        let now = new Date();

        if(now >= +expiretionDate){
          console.log("token süresi bitti")
          dispatch("logout")
        }else{
          commit("setToken",token)
          let remainTime = +expiretionDate - now;
          dispatch("expiresInTimer",remainTime)
          router.push("/")
        }
        
      }else{
        router.push("/auth")
        return false
      }
    },
    login({commit,state,dispatch},authData){
      let authLink = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="
      if(authData.isUser){
        authLink = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="
      }

      return axios.post(
                    authLink + state.fireBaseApiKey,
                    {
                      email : authData.email,
                      password : authData.password,
                      returnSecureToken : true
                    }
                  )
                  .then(response => {
                    commit("setToken",response.data.idToken)
                    localStorage.setItem("token", response.data.idToken)
                    localStorage.setItem("expiretionDate", new Date().getTime() + +response.data.expiresIn * 1000)
                    dispatch("expiresInTimer", +response.data.expiresIn * 1000)
                  })
                  .catch(ex => console.log(ex))
    },
    logout({commit,state,dispatch}){
      commit("clearToken")
      localStorage.setItem("token","")
      localStorage.setItem("expiretionDate","")
      router.replace("/auth")
    },
    expiresInTimer({dispatch},expiresIn){
      setTimeout(()=>{
        dispatch("logout")
      },expiresIn)
    }
  }
})
