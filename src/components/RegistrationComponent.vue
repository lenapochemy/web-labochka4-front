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
      //console.log(json);

      axios.post("http://localhost:8080/lab4-1.0-SNAPSHOT/api/reg", json)
          .then(response => {
            //console.log(response.data);
            const result = response.data;
            if(result.result === "success"){
              document.getElementById("res").innerHTML = "registration was success";
              // document.getElementById("forms").innerHTML = "<FormComponent/>";

            } else document.getElementById("res").innerHTML = "this login already used, please try again";

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
</style>


