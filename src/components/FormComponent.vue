<template>
  <div id="clock">
    <span class="clocks" id="h"/> : <span class="clocks" id="m"/> : <span class="clocks" id="s"/>
  </div>

  <div class="hello">Привет, {{login}}!</div>
  <LogOutComponent/>

  <div class="main-container">
    <div class="main-item">
      <canvas ref="canvas" width="440" height="440"/>
    </div>

    <div class="main-item">
  <form>
    <div class="coord">
      <span class="param">X: </span>
      <input type="radio" id="x-2" name="X" value="-2" v-model="x" />
      <label for="x-2">-2</label>

      <input type="radio" id="x-1.5" name="X" value="-1.5" v-model="x"/>
      <label for="x-1.5">-1.5</label>

      <input type="radio" id="x-1" name="X" value="-1" v-model="x"/>
      <label for="x-1">-1</label>

      <input type="radio" id="x-0.5" name="X" value="-0.5" v-model="x"/>
      <label for="x-0.5">-0.5</label>
<br>
      <input type="radio" id="x0" name="X" value="0" v-model="x" />
      <label for="x0">0</label>

      <input type="radio" id="x0.5" name="X" value="0.5" v-model="x" />
      <label for="x0.5">0.5</label>

      <input type="radio" id="x1" name="X" value="1" v-model="x"/>
      <label for="x1">1</label>

      <input type="radio" id="x1.5" name="X" value="1.5" v-model="x"/>
      <label for="x1.5">1.5</label>

      <input type="radio" id="x2" name="X" value="2" v-model="x" checked/>
      <label for="x2">2</label>
    </div>


    <div class="coord">
      <span class="param">Y: </span>

      <input type="text" id="y" name="y" v-model="y" required>
    </div>


    <div class="coord">
      <span class="param">R: </span>
      <input type="radio" id="r-2" name="R" value="-2" v-model="r" checked @change="incorrectR"/>
      <label for="r-2">-2</label>

      <input type="radio" id="r-1.5" name="R" value="-1.5" v-model="r" @change="incorrectR"/>
      <label for="r-1.5">-1.5</label>

      <input type="radio" id="r-1" name="R" value="-1" v-model="r" @change="incorrectR"/>
      <label for="r-1">-1</label>

      <input type="radio" id="r-0.5" name="R" value="-0.5" v-model="r" @change="incorrectR"/>
      <label for="r-0.5">-0.5</label>
      <br>
      <input type="radio" id="r0" name="R" value="0" v-model="r" @change="incorrectR"/>
      <label for="r0">0</label>

      <input type="radio" id="r0.5" name="R" value="0.5" v-model="r" @change="redrawCanvas"/>
      <label for="r0.5">0.5</label>

      <input type="radio" id="r1" name="R" value="1" v-model="r" @change="redrawCanvas"/>
      <label for="r1">1</label>

      <input type="radio" id="r1.5" name="R" value="1.5" v-model="r" @change="redrawCanvas"/>
      <label for="r1.5">1.5</label>

      <input type="radio" id="r2" name="R" value="2" v-model="r" @change="redrawCanvas"/>
      <label for="r2">2</label>
    </div>
    <div>
    <input class="but" type="submit" @click.prevent="checkForm()" value="Проверить"/>
    </div>
  </form>
<!--  <span>X: {{x}}, Y: {{y}}, R: {{r}}</span>-->

  <div class="fail" id="errMessageY"></div>
  <div class="fail" id="errMessageR"></div>
    </div>

  <div class="main-item" id="result_table">
  <table border="1">
    <thead>
      <th>X</th>
      <th>Y</th>
      <th>R</th>
      <th>Результат</th>
      <th>Время</th>
    </thead>
    <tr v-for="dot in dots">
      <td>{{dot.x}}</td>
      <td>{{dot.y}}</td>
      <td>{{dot.r}}</td>
      <td v-bind:class="dot.resultClass">{{dot.resultString}}</td>
      <td>{{dot.time}}</td>
    </tr>
  </table>
  </div >

<!--  <img class="main-item" src="../img/capy.jpg" alt="capybara">-->
  </div>
</template>

<script >
import axios from "axios";
import {CanvasDrawer} from "@/js/CanvasDrawer";
import LogOutComponent from "@/components/LogOutComponent.vue";

export default {
  name: "FormComponent",
  data(){
    return {
      x: -2,
      y: null,
      r: 2,
      canvasDrawer: null,
      login: null,
      dots: []
    }
  },
  components: {
    LogOutComponent
  },
  mounted() {
    this.login = sessionStorage.getItem("login");
    if(this.login == null){
      this.$router.push({name: 'start-page'});
    }
    this.getDots();
    this.dots = sessionStorage.getItem("dots");
    const canvas = this.$refs.canvas;
    this.canvasDrawer = new CanvasDrawer(canvas);
    this.canvasDrawer.drawArea(this.r, this.dots);
    this.canvasDrawer.canvas.addEventListener('click', (event) => this.clickDot(event));
  },
  methods: {
    checkForm: function (){
      if(this.validateY() && this.validateR()) {
        this.cleanErrMessage("Y");
        this.login = sessionStorage.getItem("login");

        let json = JSON.stringify({x: this.x.toString(), y: this.y.toString(), r: this.r.toString(), user: this.login});
        //console.log(json);
        axios.post("http://localhost:8080/lab4-1.0-SNAPSHOT/api/checkDot", json)
            .then(response => {
              //console.log(response);
              this.getDots();
            })
            .catch(error => console.log(error));
      }
    },
    redrawCanvas: function (){
      this.canvasDrawer.drawArea(this.r, this.dots);
      this.cleanErrMessage("R");
    },
    incorrectR: function (){
      this.createErrMessage("Значение радиуса R должно быть положительным", "R");
    },
    cleanErrMessage:function (param){
      document.getElementById("errMessage" + param).innerText = null;
    },
    createErrMessage: function (message, param){
      document.getElementById("errMessage" + param).innerText = message;
    },
    validateR: function (){
      if(this.r > 0) {
        this.cleanErrMessage("R");
        return true;
      } else {
        this.incorrectR();
        return false;
      }
    },
    validateY: function (){
      this.y = this.y.replace(",", ".");
       if (!this.isNumeric(this.y)){
        this.createErrMessage("Значение y не число", "Y");
        return false;
      } else if (this.y.length >= 17) {
        this.createErrMessage("Слишком много символов в значении y", "Y");
        return false;
      } else if(this.y <= -3 || this.y >= 3){
        this.createErrMessage("Значение y не входит в область допустимых значений (-3; 3)", "Y");
        return false;
      } else {
         this.cleanErrMessage("Y");
         return true;
       }
    },
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    clickDot: function (event){
      let loc = this.canvasDrawer.windowToCanvas(event.clientX, event.clientY);
      let x = this.canvasDrawer.xFromCanvas(loc.x);
      let y = this.canvasDrawer.yFromCanvas(loc.y);
      this.checkDot(x, y, this.lastR);
    },
    checkDot: function (x, y){
      let json = JSON.stringify({x: x.toString(), y: y.toString(), r: this.r.toString(), user: this.login});
      axios.post("http://localhost:8080/lab4-1.0-SNAPSHOT/api/checkDot", json)
          .then(response => {
            //console.log(response);
            this.getDots();
          })
          .catch(error => console.log(error));

    },
    getDots: function (){
      this.login = sessionStorage.getItem("login");
      let json = JSON.stringify({user: this.login});

      axios.post("http://localhost:8080/lab4-1.0-SNAPSHOT/api/getDots", json)
          .then(response => {
            if(response.status === 200) {
              this.dots = response.data;
              sessionStorage.setItem("dots", this.dots);
              this.canvasDrawer.drawAllDots(this.dots);

            }
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
.hello{
  font-family: fantasy;
  font-size: 1.5rem;
}

.param {
  font-size: large;
  font-weight: bold;
}
table tr:hover{
  color: darkblue;
  background-color: deeppink;
}

table > thead{
  font-size: large;
  font-weight: bold;
  background-color: deeppink;
  height: 2.5ch;
  color: black;
}

table > tr{
  text-align: center;
  color: black;
}

/*#y {*/
/*  width: 93%;*/
/*}*/
/*.coord{*/
/*  display: flex;*/
/*  justify-content: space-around;*/
/*}*/

.main-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
}

@media (min-width: 748px) and (max-width: 1177px) {
  .main-container{
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 747px) {
  .main-container{
    grid-template-columns: 1fr;
  }
}
#clock{
  font-family: fantasy;
  color: dodgerblue;
  text-shadow: 2px 2px 2px black;
  font-size: 3rem;
  word-spacing: 3pt;
  letter-spacing: 2pt;
}

.coord{
  margin: 10px;
}
.fail{
  color: red;
}
.success{
  color: green;
}


</style>