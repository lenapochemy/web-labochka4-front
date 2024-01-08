<template>
  <button id="out" class="but" @click.prevent="logout">Выйти</button>
  <br>
  <span id="logout"></span>
</template>

<script>

export default {
  name: "LogOutComponent",
  data(){
    return {
      token: ''
    }
  },
  methods: {
    logout: function (){

      localStorage.removeItem("userToken");
      localStorage.removeItem("dots");
      localStorage.removeItem("lastR")
      this.$router.push({name: 'start-page'});

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