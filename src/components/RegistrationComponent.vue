<template>

  <h1>Регистрация</h1>
  <form @submit.prevent="registration">
    <div>
      <label for="login">Логин </label>
      <input type="text" id="login" name="login" v-model="login" required>
    </div>
    <div>
      <label for="password">Пароль </label>
      <input type="password" id="password" name="password" v-model="password" required>
    </div>
    <input class="but" type="submit" value="Зарегистрироваться">
  </form>
  <span id="res"></span>

</template>

<script>
import axios from "axios";

export default {
  name: "RegistrationComponent",
  data(){
    return {
      login: null,
      password: null
    }
  },
  methods: {
    registration: function (){
      let json = JSON.stringify({login: this.login, password: this.password});

      axios.post("http://localhost:8080/lab4-1.0-SNAPSHOT/api/reg", json)
          .then(response => {
            const result = response.data;
            if(result.result === "success"){
              document.getElementById("res").innerHTML = "Вы зарегистрированы, теперь можете входить";
            } else document.getElementById("res").innerHTML = "Этот логин уже занят, пожалуйста выберите другой";

          })
          .catch(error => console.log(error));

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
label{
  font-size: large;
}
</style>


