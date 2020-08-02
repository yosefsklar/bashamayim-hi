import BHUtils from './BHUtils';
let U = new BHUtils();

export default class Block {
    width = U.adjustX(125);
    height = U.adjustY(25);
    directionH = "right";
    directionV = "down";
    riseCount = 0;
    passedText = false;
    highlight = false;
    moveTime = 10;
    broken = false;
    color = "#00bfff";
    killed = false;
    constructor(x,y,powerup,type,word,wordType,wordIndex,last){
        this.x = x;
        this.y = y;
        this.powerup = powerup;
        this.type = type;
        this.word = word;
        this.wordType = wordType;
        this.wordIndex = wordIndex;
        this.last = last;
        //this.broken = broken;
    }

    draw = (ctx) => {
        ctx.fillStyle =  this.color;

        if(this.passedText){
            this.color = "#0a13ff";
            ctx.fillStyle =  this.color;
        }
        else if(this.last){
            this.color = "#a38841";
            ctx.fillStyle =  this.color;
        }
        else if(this.highlight){
            this.color = "#5EFF16";
            ctx.fillStyle =  this.color;
        }
        // else if(this.wordType == "spike"){
        //     this.color = "#ff5046";
        //     ctx.fillStyle =  this.color;
        // }
        U.roundedRect(ctx,this.x,this.y,this.width,this.height,U.adjustX(5),"black");
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font = "bold " + U.adjustX(22)+ "px" + "'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'";
        ctx.fillStyle = "white";
        if(this.color === "#5EFF16"){
            ctx.fillStyle = "#090524";
        }
        ctx.textAlign = "center";
        // if(this.type === "break"){
        //     if(this.textNumber >= 0) {
        //         text = window.decoyWords[this.textNumber];
        //     }
        // }
        // else{
        //     if(this.textNumber >= 0) {
        //         text = window.textWords[this.textNumber];
        //     }
        //     //text = this.textNumber;
        // }

        ctx.fillText(this.word,this.x + this.width/2,this.y + ((this.height/4)*3));

        if (this.powerup === "spring") {
            ctx.fillStyle = "grey";
            ctx.fillRect(this.x + U.adjustX(35), this.y - U.adjustY(10), U.adjustX(30), U.adjustY(10));
        } else if (this.powerup === "springBoots") {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x + U.adjustX(55), this.y - U.adjustY(25), U.adjustX(15), U.adjustY(10));
            ctx.fillRect(this.x + U.adjustX(35), this.y - U.adjustY(25), U.adjustX(15), U.adjustY(10));
            ctx.fillStyle = "grey";
            ctx.fillRect(this.x + U.adjustX(55), this.y - U.adjustY(15), U.adjustX(15), U.adjustY(15));
            ctx.fillRect(this.x + U.adjustX(35), this.y - U.adjustY(15), U.adjustX(15), U.adjustY(15));
        } else if(this.powerup == "orbBackward"){
            ctx.beginPath();
            ctx.arc(this.x + (this.width/2), this.y - U.adjustY(15), 10, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.stroke();
        }
        else if(this.powerup == "orbForward"){
            ctx.beginPath();
            ctx.arc(this.x + (this.width/2), this.y - U.adjustY(15), 10, 0, 2 * Math.PI);
            ctx.fillStyle = "#5EFF16";
            ctx.fill();
            ctx.stroke();
        }
        else if(this.wordType == "spike"){
            ctx.fillStyle = "grey";
            U.downwardTriangle(ctx,this.x + (this.width * (0/6)),this.y + this.height,this.width/6,this.width/6);
            U.downwardTriangle(ctx,this.x + (this.width * (2/6)),this.y + this.height,this.width/6,this.width/6);
            U.downwardTriangle(ctx,this.x + (this.width * (4/6)),this.y + this.height,this.width/6,this.width/6);
        }
    }

    update = () => {
        if (this.type === "sideways") {
            if (this.x >= U.screenWidth - this.width) {
                this.directionH = "left";
            } else if (this.x <= 0) {
                this.directionH = "right";
            }

            if (this.directionH === "right") {
                this.x += U.adjustX(2.5);
            } else {
                this.x -= U.adjustX(2.5);
            }
        }

        else if (this.type === "rising") {
            if (this.directionV === "down" && this.riseCount === 70) {
                this.directionV = "up";
                this.riseCount = 0;
            } else if (this.directionV === "up" && this.riseCount === 70){
                this.directionV = "down";
                this.riseCount = 0;
            }
            this.riseCount = this.riseCount + 1;


            if (this.directionV === "down") {
                this.y += U.adjustX(1.25);
            } else {
                this.y -= U.adjustX(1.25);
            }
        }

        if (this.wordType === "spike") {
            if (this.directionH === "right") {
                this.x += U.adjustX(1);
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.directionH = "left";
                    this.moveTime = 10;
                }
            } else {
                this.x -= U.adjustX(1);
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.directionH = "right";
                    this.moveTime = 10;
                }
            }
        }
    }
}