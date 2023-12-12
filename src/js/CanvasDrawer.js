export class CanvasDrawer{

    canvas;
    ctx;
    lastR;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "deeppink";
        this.drawAxes();
    }

    drawDot(x, y, r, result){
        //  console.log("r=" + r + " lastR=" + this.lastR);
        x = this.xToCanvas(x);
        y = this.yToCanvas(y);
        //console.log("x=" + x + " y=" + y + " r=" + r);
        if(r == this.lastR){
            if(result) {this.ctx.fillStyle = "green";}
            else {this.ctx.fillStyle = "red";}

            //this.ctx.fillRect(x, y, 3, 3);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.arc(x, y, 1.5, 0,   2* Math.PI, false);
            this.ctx.fill();

            this.ctx.fillStyle = "deeppink";
        }
    }


    drawAllDots(dots){
        for(let i in dots){
            //this.drawDot(dot);
            //console.log(dot);
            let dot = dots[i];
            this.drawDot(dot.x, dot.y, dot.r, dot.result);

        }
    }

    //перерисовывает график - рисует область, оси и все точки
    drawArea(r, dots){
        this.lastR = r;
        sessionStorage.setItem("lastR", this.lastR);
        this.ctx.clearRect(0,0, 440, 440);
        r = this.rToCanvas(r);

        this.ctx.beginPath();
        this.ctx.moveTo(220, 220);
        this.ctx.lineTo(220 + r, 220);
        this.ctx.lineTo(220 + r, 220 - (r/2));
        this.ctx.lineTo(220, 220 - (r/2));
        this.ctx.lineTo(220, 220);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(220, 220);
        this.ctx.lineTo(220, 220 - (r/2));
        this.ctx.lineTo(220 - (r/2), 220);
        this.ctx.lineTo(220, 220);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(220, 220, r/2, 0,   Math.PI/2, false);
        this.ctx.moveTo(220, 220 + (r/2));
        this.ctx.lineTo(220, 220);
        this.ctx.lineTo(220 + (r/2), 220);
        this.ctx.fill();

        this.drawAxes();
        this.drawAllDots(dots);
    }

    //рисует оси
    drawAxes(){
        this.ctx.beginPath();
        this.ctx.moveTo(0, 220);
        this.ctx.lineTo(440,220);
        this.ctx.moveTo(220, 0);
        this.ctx.lineTo(220, 440)
        this.ctx.stroke();

       this.drawArrowhead(0 ,220, 440, 220);
       this.drawArrowhead(220, 440, 220, 0);

       this.drawAxisLabel('x', 430, 240);
       this.drawAxisLabel('y', 200, 10);

       this.drawTicks('x');
       this.drawTicks('y');

       this.drawAxisLabel('0', 210, 230);

       const centerX = 220;
       const centerY = 220;
       const r = this.rToCanvas(this.lastR);

        this.drawAxisLabel('R', centerX + r, centerY - 5);
        this.drawAxisLabel('R/2', centerX + r / 2, centerY - 5);
        this.drawAxisLabel('R', centerX + 5, centerY - r);
        this.drawAxisLabel('R/2', centerX + 5, centerY - r / 2);
        this.drawAxisLabel('- R', centerX - r, centerY - 5);
        this.drawAxisLabel('- R/2', centerX - r / 2, centerY - 5);
        this.drawAxisLabel('- R', centerX + 5, centerY + r);
        this.drawAxisLabel('- R/2', centerX + 5, centerY + r / 2);


    }

//рисует стрелочки
    drawArrowhead(fromX, fromY, toX, toY){
        const headLength = 7;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }

    //рисует черточки
    drawTicks(axis ){
        const numTicks = 9;
        const tickSpacing = 400 / (numTicks - 1);
        const tickSize = 5;
        this.ctx.beginPath();

        for (let i = 0; i < numTicks; i++) {
            const tickPosition = i * tickSpacing - 400 / 2;
            if (axis === 'x') {
                this.ctx.moveTo(220 + tickPosition, 220 - tickSize / 2);
                this.ctx.lineTo(220 + tickPosition, 220 + tickSize / 2);
            } else {
                this.ctx.moveTo(220 - tickSize / 2, 220 + tickPosition);
                this.ctx.lineTo(220 + tickSize / 2, 220 + tickPosition);
            }
        }
        this.ctx.stroke();
    }

    // рисует подписи
    drawAxisLabel(label, x, y){
      //  this.ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Цвет и прозрачность заливки
        this.ctx.fillStyle = "black"
        this.ctx.font = '14px Arial';
        this.ctx.fillText(label, x, y);
        this.ctx.fillStyle = "deeppink";
    }


    //переводят координаты туда и обратно
    xToCanvas(x){
        return (x * 100) + 220;
    }
    yToCanvas(y){
        return 220 - (y * 100);
    }
    rToCanvas(r){
        return r * 100;
    }
    xFromCanvas(x){
        return (x - 220)/100;
    }
    yFromCanvas(y){
        return (220 - y)/100;
    }
    windowToCanvas(x, y){
        let bbox = this.canvas.getBoundingClientRect();
        return {x: x -bbox.left * (this.canvas.width / bbox.width),
            y: y - bbox.top * (this.canvas.height / bbox.height)
        };
    }
}