<template>

  <h1>Регистрация</h1>
  <form @submit.prevent="registration">
    <div>
      <label for="login">Логин</label>
      <input type="text" id="login" name="login" v-model="login" required>
    </div>
    <div>
      <label for="password">Пароль</label>
      <input type="password" id="password" name="password" v-model="password" required>
    </div>
    <input type="submit" value="Зарегистрироваться">
  </form>
  <span id="res"></span>

</template>

<script setup>
import axios from "axios";

let login = "";
let password = "";
//console.log("bbbbbb");

const registration = () => {

  //console.log("login=" + login + " password=" + password);
  let json = JSON.stringify({login: login, password: password});
  //console.log(json);

  axios.post("http://localhost:8080/lab4-1.0-SNAPSHOT/api/reg", json)
      .then(response => {
        //console.log(response.data);
        const result = response.data;
        if(result.result === "success"){
          document.getElementById("res").innerHTML = "registration was success";
        } else document.getElementById("res").innerHTML = "this login already used, please try again";

      })
      .catch(error => console.log(error));
}

</script>

<style scoped>

</style>


