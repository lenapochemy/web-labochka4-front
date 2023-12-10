<script >
import Header from './components/Header.vue'
import RegistrationComponent from "@/components/RegistrationComponent.vue";
import LogInComponent from "@/components/LogInComponent.vue";
import LogOutComponent from "@/components/LogOutComponent.vue";

export default {
  name: 'App',
  components: {
    Header,
    LogInComponent,
    RegistrationComponent
    // LogOutComponent

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
      currentButton: "LogIn"
    }
  },
  computed: {
    currentButtonComponent: function (){
      return this.currentButton + "Component";
    }
  },
  methods: {
    reg: function (){
      document.getElementById("reg").innerHTML = "<RegistrationView />";
    }
  }
}
</script>

<template>
  <header>
<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

    <div class="wrapper">
      <Header v-bind="headerParams"/>

    </div>
  </header>

  <main>
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
<!--    <RegistrationView />-->
<!--    <LogInComponent/>-->
<!--    <LogOutComponent/>-->


  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

/*.logo {*/
/*  display: block;*/
/*  margin: 0 auto 2rem;*/
/*}*/

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  /*.logo {*/
  /*  margin: 0 2rem 0 0;*/
  /*}*/

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.button {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
