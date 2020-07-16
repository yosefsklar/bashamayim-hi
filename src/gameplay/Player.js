import BHUtils from './BHUtils';
import BlockSpawner from './BlockSpawner';
import playerImage from '../Images/SRHirsch.png';

const U = new BHUtils();

export default class Player {
    x = U.adjustX(300);
    y = U.adjustY(550);
    width = U.adjustX(80);
    height = U.adjustY(80);
    xSpeed = U.adjustX(6.7);
    ySpeed = 0;
    springBootsDurability = 0;
    orbDurability  = 0;
    yDistanceTravelled = 0;
    direction = "left";
    dead = false;
    win = false;
    highestWordIndex = 0;
    constructor(gravity,setLowestBlock,blockSpawner, mainText){
        this.img = new Image();
        //img.src = "Images/rightPlayer.png";
        this.img.src = playerImage;
        this.gravity = gravity;
        this.setLowestBlock = setLowestBlock;
        this.BSpawn = blockSpawner;
        this.mainText = mainText;

    }

    update = (lowestBlock,difficulty,blocks,blockOffset,ctx,holdingLeftKey, holdingRightKey) => {
        if (this.dead) {
            ctx.font = "bold " + U.adjustX(54)+ "px 'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'";
            ctx.fillStyle = "#090524";
            ctx.textAlign = "center";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fillText("Game Over:", U.screenWidth / 2, U.screenHeight / 2);
            ctx.strokeText("Game Over:", U.screenWidth / 2, U.screenHeight / 2);
            ctx.font = "bold " + U.adjustX(36)+ "px 'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'";
            ctx.fillStyle = "#5EFF16";
            ctx.fillText("Press 'c' to Continue", U.screenWidth / 2, (U.screenHeight / 2) + 50);
            ctx.strokeText("Press 'c' to Continue", U.screenWidth / 2, (U.screenHeight / 2) + 50);
            ctx.fillText("Press 'n' to Start a New Game", U.screenWidth / 2, (U.screenHeight / 2) + 100);
            ctx.strokeText("Press 'n' to Start a New Game", U.screenWidth / 2, (U.screenHeight / 2) + 100);

        }
        else if(this.win){
            this.ySpeed = 0;
            this.xSpeed = 0;
            ctx.font = "bold " + U.adjustX(45)+ "px 'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'";
            ctx.fillStyle = "#090524";
            ctx.textAlign = "center";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fillText("Congradulations!", U.screenWidth / 2, U.screenHeight / 2);
            ctx.strokeText("Congradulations!", U.screenWidth / 2, U.screenHeight / 2);
            ctx.font = "bold " + U.adjustX(36)+ "px 'BlinkMacSystemFont','Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'";
            ctx.fillStyle = "#5EFF16";
            ctx.fillText("Press 'n' to Start a New Game", U.screenWidth / 2, (U.screenHeight / 2) + 100);
            ctx.strokeText("Press 'n' to Start a New Game", U.screenWidth / 2, (U.screenHeight / 2) + 100);

        }
        else {
            this.ySpeed += this.gravity;
            if (this.y <= U.screenHeight / 2 - U.adjustY(100) && this.ySpeed <= 0) {
                for (let i = 0; i < blocks.length; i++) {
                    blocks[i].y -= this.ySpeed;
                }
            } else {
                this.y += this.ySpeed;
            }
            this.yDistanceTravelled -= this.ySpeed;
        }

        //A key pressed
        if (holdingLeftKey) {
            this.direction = "left";
            //this.img.src = "Images/leftPlayer.png";
            this.img.src = playerImage;
            this.moveLeft();
        }
        //D key pressed
        if (holdingRightKey) {
            this.direction = "right";
            //this.img.src = "Images/rightPlayer.png";
            this.img.src = playerImage;
            this.moveRight();
        }

        //Check for jump
        for (let i = 0; i < blocks.length; i++) {
            if (this.ySpeed >= 0) {
                if (this.x >= blocks[i].x - this.width + U.adjustX(15) && this.x <= blocks[i].x + blocks[i].width - U.adjustX(15) &&
                    this.y >= blocks[i].y - this.height && this.y <= blocks[i].y + blocks[i].height - this.height) {
                    if (blocks[i].wordType === "decoyWord") {
                        blocks[i].broken = true;
                    } else if (blocks[i].wordType === "spike") {
                        this.jump(blocks, i,lowestBlock);
                        //blocks[i] = 0;
                        blocks[i].wordType = "wordText";
                        /*blocks[i].killed = true;*/
                        blocks[i].word = '';
                        blocks[i].color = 'red';
                    } else {
                        if(blocks[i].last){
                            console.log("Win");
                            this.win = true;
                        }
                        this.jump(blocks, i,lowestBlock);
                        //    blocks[i].passedText = true
                    }
                }
            }
            if (this.y > blocks[i].y) {
                //Check for hit spike
                if (blocks[i].wordType === "spike") {
                    if (this.x >= blocks[i].x - this.width + U.adjustX(28) && this.x <= blocks[i].x + blocks[i].width - U.adjustX(28) &&
                        this.y >= blocks[i].y - blocks[i].height  && this.y <= blocks[i].y + blocks[i].height) {
                        this.dead = true;
                    }
                }
            }
        }


        for (let i = blocks.length-1; i > 0; i--) {
            if (blocks[i].y > U.screenHeight) {
                this.setLowestBlock(i+1);
                lowestBlock = i + 1;
                break;
            }
        }

        if (this.y >= blocks[lowestBlock].y || this.y >= U.screenHeight) {
            this.dead = true;
        }

        if (lowestBlock >= 45) {
            if (difficulty < 0) {
                difficulty += 1;
            }
            this.BSpawn.blockSpawner(lowestBlock,blocks,blockOffset,difficulty,this.mainText);
        }

        // for (let i = 0; i < blocks.length; i++) {
        //     if (blocks[i].y < this.y + this.height) {
        //         break;
        //     }
        //     if(blocks[i].type !== "break") {
        //         blocks[i].passedText = true;
        //     }
        // }
    }
    jump = (blocks,blockIndex,lowestBlock) => {
        if(blocks[blockIndex].wordType === 'textWord') {
            console.log("high " + this.highestWordIndex);
            this.highestWordIndex = Math.max(this.highestWordIndex, blocks[blockIndex].wordIndex);
            console.log("word " + blocks[blockIndex].wordIndex)
            console.log( Math.max(this.highestWordIndex, blocks[blockIndex].wordIndex));
        }
        let block = blocks[blockIndex];
        let powerup = block.powerup;
        let type = block.type;
        let wordType = block.wordType;
        //this.ySpeed = U.adjustY( -13.2);
        this.ySpeed = U.adjustY( -11.5);

        if (powerup === "springBoots") {
            this.springBootsDurability = 6;
        }

        if (powerup === "orbBackward") {
            this.orbDurability = 10;
        }


        if (this.orbDurability !== 0) {
            for (let i = lowestBlock; i < blocks.length; i++) {
                if (blocks[i].y <= this.y + this.height - blocks[i].height) {
                    block.powerup = 0;
                    break;
                }
                if(blocks[i].wordType !== "decoyWord") {
                    blocks[i].passedText = true;
                }
            }
            this.orbDurability -= 1;

        }
        if (powerup === "orbForward") {
            let i = blockIndex + 1;
            let count = 0;
            while(count < 5){
                while(blocks[i].wordType === "decoyWord"){
                    i++;
                }
                blocks[i].highlight = true;
                i++;
                count++;
            }
            block.powerup = 0;
        }

        if (wordType === "textWord") {
            if (powerup === "spring") {
               // this.ySpeed = U.adjustY(-20);
                this.ySpeed = U.adjustY(-14);
            }
        }

        if (this.springBootsDurability !== 0) {
            this.ySpeed = U.adjustY(-13);
            this.springBootsDurability -= 1;
        }
        // for (let i = lowestBlock; i < blocks.length; i++) {
        //     if (blocks[i].y <= this.y + this.height - blocks[i].height) {
        //         break;
        //     }
        //     if(blocks[i].type !== "break") {
        //         blocks[i].passedText = true;
        //     }
        // }
    }

    moveLeft = () => {
        this.x -= this.xSpeed;
        if (this.x <= -this.width) {
            this.x = U.screenWidth;
        }
    }

    moveRight = () => {
        this.x += this.xSpeed;
        if (this.x >= U.screenWidth) {
            this.x = -this.width;
        }
    }

    draw = (ctx) => {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this.springBootsDurability !== 0) {
            if (this.direction === "right") {
                ctx.fillStyle = "blue";
                ctx.fillRect(this.x + U.adjustX(10), this.y + U.adjustY(66), U.adjustX(15), U.adjustY(10));
                ctx.fillRect(this.x + U.adjustX(33), this.y + U.adjustY(66), U.adjustX(15), U.adjustY(10));
                ctx.fillStyle = "grey";
                ctx.fillRect(this.x + U.adjustX(10), this.y + U.adjustY(76), U.adjustX(15), U.adjustY(15));
                ctx.fillRect(this.x + U.adjustX(33), this.y + U.adjustY(76), U.adjustX(15), U.adjustY(15));
            } else {
                ctx.fillStyle = "blue";
                ctx.fillRect(this.x + U.adjustX(30), this.y + U.adjustY(66), U.adjustX(15), U.adjustY(10));
                ctx.fillRect(this.x + U.adjustX(53), this.y + U.adjustY(66), U.adjustX(15), U.adjustY(10));
                ctx.fillStyle = "grey";
                ctx.fillRect(this.x + U.adjustX(30), this.y + U.adjustY(76), U.adjustX(15), U.adjustY(15));
                ctx.fillRect(this.x + U.adjustX(53), this.y + U.adjustY(76), U.adjustX(15), U.adjustY(15));
            }
        }
    }
}