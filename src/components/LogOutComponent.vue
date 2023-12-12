<template>
  <button id="out" class="but" @click.prevent="logout">Выйти</button>
<!--  <span id="logout"></span>-->
</template>

<script>
import axios from "axios";

export default {
  name: "LogOutComponent",
  methods: {
    logout: function (){
      axios.get("http://localhost:8080/lab4-1.0-SNAPSHOT/api/logout")
          .then(response => {
            if(response.status === 200) {
              // document.getElementById("logout").innerHTML = "logout success";
              sessionStorage.removeItem("login");
              sessionStorage.removeItem("dots");
              this.$router.push({name: 'start-page'});
            } else {
              // document.getElementById("logout").innerHTML =  "you already logout";
            }
          }).catch(error => {
        console.log(error);
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