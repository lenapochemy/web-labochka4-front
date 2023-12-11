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