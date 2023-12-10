<template>
  <h1>Вход</h1>
  <form @submit.prevent="logIn">
    <div>
      <label for="login">Логин</label>
      <input type="text" id="login" name="login" v-model="login" required>
    </div>
    <div>
      <label for="password">Пароль</label>
      <input type="password" id="password" name="password" v-model="password" required>
    </div>
    <input type="submit" value="Войти">
  </form>
  <span id="res"></span>

</template>

<script setup>
import axios from "axios";

let login = "";
let password = "";

const logIn = () => {
  let json = JSON.stringify({login: login, password: password});

  axios.post("http://localhost:8080/lab4-1.0-SNAPSHOT/api/login", json)
      .then(response => {
        if(response.data.result === "success"){
          document.getElementById("res").innerHTML = "login success";
        } else {
          document.getElementById("res").innerHTML = "wrong login or password, try again";
        }
      })
      .catch(error => console.log(error));
}

// export default {
//   name: "LogInComponent"
// }
</script>

<style scoped>

</style>