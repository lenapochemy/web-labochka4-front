<template>
  <button id="out" class="but" @click.prevent="logout">Выйти</button>
  <span id="logout"></span>
</template>

<script>
import axios from "axios";

export default {
  name: "LogOutComponent",
  data(){
    return {
      userToken: null
    }
  },
  methods: {
    logout: function (){
      this.userToken = sessionStorage.getItem("userToken");
      let json = JSON.stringify({userToken: this.userToken});
      axios.post("http://localhost:8080/lab4-1.0-SNAPSHOT/api/user/logOut", json)
          .then(response => {
            if(response.status === 200) {
              // document.getElementById("logout").innerHTML = "logout success";
              sessionStorage.removeItem("userToken");
              sessionStorage.removeItem("dots");
              this.$router.push({name: 'start-page'});
            }
            // else {
            //    document.getElementById("logout").innerHTML =  "Проблемы с сервером";
            // }
          }).catch(error => {
       // console.log(error);
        if(error.response.status === 401 || error.response.status === 403){
          document.getElementById("logout").innerHTML = "Вы уже вышли";
        } else document.getElementById("logout").innerHTML = "Проблемы с сервером :(";
      })
    }
  }
}
</script>

<style scoped>
.but{
  background-color: deeppink;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: large;
  margin-top: 30px;
  margin-bottom: 30px;
}
.but:hover, .but:focus{
  background-color: lightpink;
}

#out{
  background-color: #31d1f5;

}
</style>