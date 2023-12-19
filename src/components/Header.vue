<script >
export default {
  name: "Header",
  props: {
    title: String,
    name: String,
    group: String,
    variant: String
  },
  mounted() {
    this.updateClock();
    //sessionStorage.removeItem("userToken");
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

<template>
  <div class="greetings">
    <h1 id="my_name">{{name}}, {{group}}</h1>
    <h3 id="lab_work">{{title}}, вариант {{variant}}</h3>
  </div>
  <div id="clock">
    <span class="clocks" id="h"/> : <span class="clocks" id="m"/> : <span class="clocks" id="s"/>
  </div>

</template>


<style scoped>

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;

}

h3 {
  font-size: 1.2rem;
}

.greetings  {
  /*text-align: center;*/
  /*display: flex;*/
}


/*@media (min-width: 1024px) {*/
/*  .greetings h1,*/
/*  .greetings h3 {*/
/*    text-align: left;*/
/*  }*/
/*}*/

#my_name, #lab_work {
  font-family: fantasy;
  color: deeppink;
  text-shadow: 2px 2px 2px black;
  font-size: 3rem;
  word-spacing: 4pt;
  letter-spacing: 2pt;
}

#lab_work{
  font-size: 2rem;
  letter-spacing: 1pt;
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
