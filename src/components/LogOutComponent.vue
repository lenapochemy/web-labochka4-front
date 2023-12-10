<template>

  <button @click.prevent="logout">Выйти</button>
  <span id="logout"></span>
</template>

<script setup >
import axios from "axios";

const logout = () => {

  axios.get("http://localhost:8080/lab4-1.0-SNAPSHOT/api/logout")
      .then(response => {
        console.log(response);
        document.getElementById("logout").innerHTML = "logout success";
      }).catch(error => {
    document.getElementById("logout").innerHTML = "you already logout";
  })
}
// export default {
//   name: "LogOutComponent"
// }
</script>

<style scoped>

</style>