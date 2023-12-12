<script >
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data(){
    return {
      headerParams: {
        title: "Лабораторная работа 4",
        name: "Русакова Елена Дмитриевна",
        group: "P3217",
        variant: "1755"
      }
    }
  }
}
</script>

<template >
  <header>
    <div class="wrapper">
      <Header v-bind="headerParams"/>
      <router-view/>

    </div>
  </header>

  <main>

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

/*@media (min-width: 1024px) {*/
/*  header {*/
/*    display: flex;*/
/*    place-items: center;*/
/*    padding-right: calc(var(--section-gap) / 2);*/
/*  }*/
/*  header .wrapper {*/
/*    display: flex;*/
/*    place-items: flex-start;*/
/*    flex-wrap: wrap;*/
/*  }*/
/*}*/

header{
  text-align: center;
}

/*@media (min-width: 1177px) {*/
/*  header {*/
/*    */
/*    text-align: center;*/
/*  }*/
/*}*/

/*@media (min-width: 748px) and (max-width: 1176px){*/
/*  header {*/
/*    text-align: left;*/

/*  }*/

/*}*/
/*@media (max-width: 747px){*/
/*  header {*/
/*    text-align: left;*/
/*  }*/

/*}*/


/*.tab-button {*/
/*  padding: 6px 10px;*/
/*  border-top-left-radius: 3px;*/
/*  border-top-right-radius: 3px;*/
/*  border: 1px solid #ccc;*/
/*  cursor: pointer;*/
/*  background: #f0f0f0;*/
/*  margin-bottom: -1px;*/
/*  margin-right: -1px;*/
/*}*/
/*.tab-button:hover {*/
/*  background: #e0e0e0;*/
/*}*/
/*.tab-button.active {*/
/*  background: #e0e0e0;*/
/*}*/
/*.button {*/
/*  border: 1px solid #ccc;*/
/*  padding: 10px;*/
/*}*/
</style>
