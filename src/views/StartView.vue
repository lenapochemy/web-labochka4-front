<template>
  <header>
  </header>
  <main>
    <div id="clock">
      <span class="clocks" id="h"/> : <span class="clocks" id="m"/> : <span class="clocks" id="s"/>
    </div>
    <div id="forms">
      <div>
        <button
            v-for="button in buttons"
            v-bind:key="button"
            v-bind:class="['tab-button', {active: currentButton === button}]"
            v-on:click="currentButton = button"
        >
          {{button}}
        </button>
        <component v-bind:is="currentButtonComponent"></component>
      </div>

    </div>
    <div>
     <img src="../img/pig.jpg" alt="just pig">
    </div>
  </main>

</template>

<script>
import LogInComponent from "@/components/LogInComponent.vue";
import RegistrationComponent from "@/components/RegistrationComponent.vue";

export default {
  name: "StartView",
  components: {
    LogInComponent,
    RegistrationComponent
  },
  data(){
    return {
      headerParams: {
        title: "Лабораторная работа 4",
        name: "Русакова Елена Дмитриевна",
        group: "P3217",
        variant: "1755"
      },
      buttons: ["Registration", "LogIn"],
      currentButton: "LogIn",
    }
  },
  computed: {
    currentButtonComponent: function (){
      return this.currentButton + "Component";
    }
  },
  mounted() {
    this.updateClock();
  },
  methods: {
    clock: function (){
      let date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      if(hour < 10) hour = "0" + hour;
      if(min < 10) min = "0" + min;
      if(sec < 10) sec = "0" + sec;
      document.getElementById("h").innerHTML = hour;
      document.getElementById("m").innerHTML = min;
      document.getElementById("s").innerHTML = sec;
    },
    updateClock: function (){
      this.clock();
      setInterval(this.clock, 1000);
    }
  }
}
</script>

<style scoped>
.tab-button{
  background-color: lightpink;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: large;
  /*margin-top: 30px;*/
  /*margin-bottom: 30px;*/
  margin: auto;
}
.tab-button:hover, .tab-button:focus, .tab-button:active{
  background-color: deeppink;
}
#clock{
   font-family: fantasy;
   color: dodgerblue;
   text-shadow: 2px 2px 2px black;
   font-size: 5rem;
   word-spacing: 4pt;
   letter-spacing: 2pt;
 }
</style>