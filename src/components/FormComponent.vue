<template>

  <div class="main-container">
    <div class="main-item">
      <canvas ref="canvas" width="440" height="440"/>
    </div>

    <div class="main-item">
  <form>
    <div class="coord">
      <span class="param">X: </span>
      <input type="radio" id="x-2" name="X" value="-2" v-model="dot.x" />
      <label for="x-2">-2</label>
      <input type="radio" id="x-1.5" name="X" value="-1.5" v-model="dot.x"/>
      <label for="x-1.5">-1.5</label>
      <input type="radio" id="x-1" name="X" value="-1" v-model="dot.x"/>
      <label for="x-1">-1</label>
      <input type="radio" id="x-0.5" name="X" value="-0.5" v-model="dot.x"/>
      <label for="x-0.5">-0.5</label>
        <br>
      <input type="radio" id="x0" name="X" value="0" v-model="dot.x" />
      <label for="x0">0</label>
      <input type="radio" id="x0.5" name="X" value="0.5" v-model="dot.x" />
      <label for="x0.5">0.5</label>
      <input type="radio" id="x1" name="X" value="1" v-model="dot.x"/>
      <label for="x1">1</label>
      <input type="radio" id="x1.5" name="X" value="1.5" v-model="dot.x"/>
      <label for="x1.5">1.5</label>
      <input type="radio" id="x2" name="X" value="2" v-model="dot.x" />
      <label for="x2">2</label>
    </div>


    <div class="coord">
      <span class="param">Y: </span>

      <input type="text" id="y" name="y" v-model="dot.y" required>
    </div>


    <div class="coord">
      <span class="param">R: </span>
      <input type="radio" id="r-2" name="R" value="-2" v-model="dot.r" @change="incorrectR"/>
      <label for="r-2">-2</label>
      <input type="radio" id="r-1.5" name="R" value="-1.5" v-model="dot.r" @change="incorrectR"/>
      <label for="r-1.5">-1.5</label>
      <input type="radio" id="r-1" name="R" value="-1" v-model="dot.r" @change="incorrectR"/>
      <label for="r-1">-1</label>
      <input type="radio" id="r-0.5" name="R" value="-0.5" v-model="dot.r" @change="incorrectR"/>
      <label for="r-0.5">-0.5</label>
        <br>
      <input type="radio" id="r0" name="R" value="0" v-model="dot.r" @change="incorrectR"/>
      <label for="r0">0</label>
      <input type="radio" id="r0.5" name="R" value="0.5" v-model="dot.r" @change="redrawCanvas"/>
      <label for="r0.5">0.5</label>
      <input type="radio" id="r1" name="R" value="1" v-model="dot.r" @change="redrawCanvas"/>
      <label for="r1">1</label>
      <input type="radio" id="r1.5" name="R" value="1.5" v-model="dot.r" @change="redrawCanvas"/>
      <label for="r1.5">1.5</label>
      <input type="radio" id="r2" name="R" value="2" v-model="dot.r" @change="redrawCanvas"/>
      <label for="r2">2</label>
    </div>
    <div>
    <input class="but" type="submit" @click.prevent="checkForm()" value="Проверить"/>
    </div>
  </form>

  <div class="fail" id="errMessageY"></div>
  <div class="fail" id="errMessageR"></div>
      <div id="errMessage"></div>
    </div>

  <div class="main-item" >
  <table border="1" id="result_table">
    <thead>
      <th>X</th>
      <th>Y</th>
      <th>R</th>
      <th>Результат</th>
      <th>Время</th>
    </thead>
    <tbody>
    <tr v-for="dot in dots">
      <td>{{dot.x}}</td>
      <td>{{dot.y}}</td>
      <td>{{dot.r}}</td>
      <td v-bind:class="[dot.result ? success: fail]">{{dot.result ? "Точка попала" : "Точка не попала"}}</td>
      <td>{{dot.time}}</td>
    </tr>
    </tbody>
  </table>
  </div >
  </div>
</template>

<script >
import {CanvasDrawer} from "@/js/CanvasDrawer";
import LogOutComponent from "@/components/LogOutComponent.vue";
import {errorHandler} from "@/js/utils";
import {api} from "@/axios";

export default {
  name: "FormComponent",
  data(){
    return {
      dot: {
        x: '2',
        y: null,
        r: '2'
      },
      token: '',
      canvasDrawer: null,
      success: "success",
      fail: "fail",
      dots: []
    }
  },
  components: {
    LogOutComponent
  },
  mounted() {

    this.dots = localStorage.getItem("dots");
    //console.log(this.dots);
    const canvas = this.$refs.canvas;
    this.canvasDrawer = new CanvasDrawer(canvas);
    this.canvasDrawer.drawArea(this.dot.r, this.dots);
    this.canvasDrawer.canvas.addEventListener('click', (event) => this.clickDot(event));
    this.getDots();
  },
  methods: {
    checkForm: function (){
      if(this.validateY() && this.validateR()) {
        this.cleanErrMessage("Y");
        this.token = localStorage.getItem("userToken");

        api.post("/dots", this.dot,{
          headers: {
            "Content-Type" : "application/json",
            "Authorization" : this.token
          }
        })
            .then(response => {
              this.cleanErrMessage("");
              this.getDots();
            })
            .catch(error => {
              errorHandler(error.response.status, "errMessage");
            });
      }
    },
    redrawCanvas: function (){
      this.canvasDrawer.drawArea(this.dot.r, this.dots);
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
      if(this.dot.r > 0) {
        this.cleanErrMessage("R");
        return true;
      } else {
        this.incorrectR();
        return false;
      }
    },
    validateY: function (){
      if(this.dot.y == null){
        this.createErrMessage("Значение y не введено", "Y");
        return false;
      } else {
        this.dot.y = this.dot.y.replace(",", ".");
        let y = this.dot.y;
        if (!this.isNumeric(y)) {
          this.createErrMessage("Значение y не число", "Y");
          return false;
        } else if (y.length >= 17) {
          this.createErrMessage("Слишком много символов в значении y", "Y");
          return false;
        } else if (y <= -3 || y >= 3) {
          this.createErrMessage("Значение y не входит в область допустимых\nзначений (-3; 3)", "Y");
          return false;
        } else {
          this.cleanErrMessage("Y");
          return true;
        }
      }
    },
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    clickDot: function (event){
      let loc = this.canvasDrawer.windowToCanvas(event.clientX, event.clientY);
      let x = this.canvasDrawer.xFromCanvas(loc.x);
      let y = this.canvasDrawer.yFromCanvas(loc.y);
      this.checkDot(x, y);
    },
    checkDot: function (x, y){
       let json = JSON.stringify({x: x.toString(), y: y.toString(), r: this.dot.r.toString()});
      api.post("/dots", json, {
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : this.token
        }
      })
          .then(response => {
            this.cleanErrMessage("");
            //console.log(response);
            this.getDots();
          })
          .catch(error => {
            errorHandler(error.response.status, "errMessage");
          });

    },
    getDots: function (){
      this.token = localStorage.getItem("userToken");

      api.get("/dots", {
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : this.token
        }
      })
          .then(response => {
            if(response.status === 200) {
              this.cleanErrMessage("");
              this.dots = response.data;
              localStorage.setItem("dots", this.dots);
              this.canvasDrawer.drawAllDots(this.dots);
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "errMessage");
          });
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
/*.hello{*/
/*  font-family: fantasy;*/
/*  font-size: 1.5rem;*/
/*}*/

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