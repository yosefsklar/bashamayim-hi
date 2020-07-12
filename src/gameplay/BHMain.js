import Block from './Block';
import BlockSpawner from './BlockSpawner';
import Player from './Player';
import BHUtils from './BHUtils';
import backgroundImagePng from '../Images/cloudbackgroundRed2.png';
// import {updateDoodleGame} from "../doodleRest";

const U = new BHUtils();

export default class BHMain {
    holdingLeftKey = false;
    holdingRightKey = false;
    dead = false;
    difficulty = 0;
    score = 0;
    //gravity = U.adjustY(0.34);
    gravity = U.adjustY(0.25);
    lowestBlock = 0;
    blocks = [];
    blockOffset = U.adjustY(50);
    fps = 60;//frames per second
    then = Date.now();
    interval = 1000/this.fps;
    delta;
    now;
    playing;
    reported = false;
    id = '';


    constructor(canvas, level,mainText,decoyText,id,newGame, continueGame, setIndex, config) {
        console.log(mainText);
        this.mainText = mainText;
        this.ctx = canvas.getContext("2d");
        canvas.width = U.screenWidth;
        canvas.height = U.screenHeight;

        window.addEventListener('keydown',this.keydown,false);
        window.addEventListener('keyup',this.keyup,false);
        this.config = config;
        this.BSpawn = new BlockSpawner(level, mainText,decoyText, this.config)
        this.level = level;
        this.setFirstBlock(this.blocks);
        this.player = new Player(this.gravity,this.setLowestBlock,this.BSpawn,this.mainText);
        this.BSpawn.blockSpawner(this.lowestBlock,this.blocks,this.blockOffset,this.difficulty,this.mainText);
        this.id = id;
        this.newGame = newGame;
        this.continueGame =  continueGame;
        this.setIndex = setIndex;
        this.playing = true;
        this.loop();
    }
    
    keydown = (e) => {
        //TODO: change to avoid deprication
        if (e.keyCode === 37) {
            this.holdingLeftKey = true;
        }   else if (e.keyCode === 39) {
            this.holdingRightKey = true;
        }

        //when game ends, and the press play again, things reset (TODO this should be a self contained function)
        else if (e.keyCode === 67 && this.player.dead) {
            //continue - Points need to reset
            //continue - Points need to reset
            this.blocks = [];
            this.lowestBlock = 0;
            this.difficulty = 0;
            this.score = 0;
            this.player.springBootsDurability = 0;
            this.blocks.push(new Block());
            this.blocks[0].x = U.adjustX(300);
            this.blocks[0].y = U.adjustY(650);
            this.blocks[0].type = 0;
            this.blocks[0].powerup = 0;
            this.blocks[0].word = "";
            this.reported = false;
            this.BSpawn.setIndex(this.player.highestWordIndex);
            this.BSpawn.blockSpawner(this.lowestBlock,this.blocks,this.blockOffset,this.difficulty, this.mainText);
            this.player.yDistanceTravelled = 0;
            this.player.x = U.adjustX(300);
            this.player.y = U.adjustY(550);
            this.player.dead = false;
            this.continueGame();
        }

        if (e.keyCode === 78 && (this.player.dead || this.player.win)) {
            //continue - Points need to reset
          this.newGame();
        }

    }


    keyup = (e) => {
        if (e.keyCode === 37) {
            this.holdingLeftKey = false;
        } else if (e.keyCode === 39) {
            this.holdingRightKey = false;
        }
    }



    showScore = (yDistanceTravelled,score,ctx) => {
        if (yDistanceTravelled > score) {
            this.score = Math.round(yDistanceTravelled);
        }
        //TODO: change this
        ctx.font = "bold 36px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(score, 18, 40);
    }

    setFirstBlock = (blocks) => {
        let x = U.adjustX(300);
        let y = U.adjustY(650);
        let type = 0;
        let powerup = 0;
        let word = "";
        blocks.push(new Block(x,y,powerup,type,word));
    }
    setLowestBlock = (num) =>{
        this.lowestBlock = num;
    }

    exitGame =() =>{
 //       updateDoodleGame(this.id,"exit",this.score)
        this.playing = false;
    }


    loop =()=> {
            if(this.playing) {
                requestAnimationFrame(this.loop);
            }

            //This sets the FPS to 60
            this.now = Date.now();
            this.delta = this.now - this.then;
            //if an interval has elapsed, rerender
            if (this.delta > this.interval) {
                let backgroundImage = new Image();
                backgroundImage.src = backgroundImagePng;
                this.ctx.fillStyle = "#ffefe4";
                this.ctx.fillRect(0, 0, U.screenWidth, U.screenHeight);
                this.ctx.drawImage(backgroundImage, 0, 0, U.screenWidth, U.screenHeight);
                this.ctx.fill();
                for (let i = 0; i < this.blocks.length; i++) {
                    if (!this.blocks[i].broken) {
                        this.blocks[i].update();
                        this.blocks[i].draw(this.ctx);
                    }
                }


                this.player.update(this.lowestBlock, this.difficulty, this.blocks, this.blockOffset, this.ctx, this.holdingLeftKey, this.holdingRightKey);
                if (!this.player.dead) {
                    this.player.draw(this.ctx);
                }

                this.setIndex(this.player.highestWordIndex);

                this.showScore(this.player.yDistanceTravelled, this.score, this.ctx);

                this.ctx.fill();
                this.then = this.now - (this.delta % this.interval);
            }
            if(this.player.dead){
                if(!this.reported){
  //                  updateDoodleGame(this.id,"died",this.score);
                }
                this.reported = true;
            }


    }

}