import Block from './Block';
import BlockGenerator from './BlockGenerator';
import Player from './Player';
import BHUtils from './BHUtils';
import backgroundImagePng from '../Images/sky5.jpg';

const U = new BHUtils();

export default class BHMain {
    holdingLeftKey = false;
    holdingRightKey = false;
    canvas;
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
        this.mainText = mainText;
        this.ctx = canvas.getContext("2d");
        // smoothen out images (background and player)
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.webkitImageSmoothingEnabled = true;
        this.ctx.mozImageSmoothingEnabled = true;
        canvas.width = U.screenWidth;
        canvas.height = U.screenHeight;
        const scale = window.devicePixelRatio || 1;

        // Set actual pixel resolution of the canvas
        canvas.width = canvas.clientWidth * scale;
        canvas.height = canvas.clientHeight * scale;
        this.ctx.scale(scale, scale);
        this.canvas = canvas;
        window.addEventListener('keydown',this.keydown,false);
        window.addEventListener('keyup',this.keyup,false);
        this.config = config;
        this.BGenerate = new BlockGenerator(level, mainText,decoyText, this.config)
        this.level = level;
        this.setFirstBlock(this.blocks);
        this.player = new Player(this.gravity,this.setLowestBlock,this.BGenerate,this.mainText);
        this.BGenerate.blockGenerator(this.lowestBlock,this.blocks,this.blockOffset,this.difficulty,this.mainText);
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
            this.blocks.push(new Block());
            this.blocks[0].x = U.adjustX(300);
            this.blocks[0].y = U.adjustY(650);
            this.blocks[0].type = 0;
            this.blocks[0].powerup = 0;
            this.blocks[0].word = "";
            this.reported = false;
            this.BGenerate.section = 0
            this.BGenerate.setIndex(this.player.highestWordIndex);
            this.BGenerate.blockGenerator(this.lowestBlock,this.blocks,this.blockOffset,this.difficulty, this.mainText);
            this.player.yDistanceTravelled = 0;
            this.player.x = U.adjustX(300);
            this.player.y = U.adjustY(550);
            this.player.dead = false;
            this.continueGame();
        }

        if (e.keyCode === 78 && (this.player.dead || this.player.win)) {
            //continue - Points need to reset
          this.newGame();
          this.playing = false;
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

    //todo i think this is all wrong, we want paint -> request -> update
    // make fps configurable
    loop =()=> {
            if(this.playing) {
                setTimeout(function() {
                    requestAnimationFrame(this.loop);
                    //TODO change the movement relative to 1/60 of a second
                    // let now = this.date.getTime();
                    // this.delta = (now - this.time) / (1000/60);
                    //
                    // this.time = now;

                    // Drawing code goes here
                }.bind(this), (1000/60));
            }
            //TODO actively change the size of the cnavas
            //U.setDimensions()
            // this.canvas.width = U.screenWidth
            // this.canvas.height = U.screenHeight

            //This sets the FPS to 60
            this.now = Date.now();
            this.delta = this.now - this.then;
            // let updateDelta = this.delta / this.interval
            //if an interval has elapsed, rerender
            if (this.delta > this.interval) {
                //PAINT

                    let backgroundImage = new Image();
                    backgroundImage.src = backgroundImagePng;
                    this.ctx.drawImage(backgroundImage, 0, 0, U.screenWidth -1, U.screenHeight);
                    this.ctx.strokeRect(0,0,U.screenWidth -1, U.screenHeight);
                    this.ctx.fill();
                    for (let i = 0; i < this.blocks.length; i++) {
                        if (!this.blocks[i].broken) {
                            //todo the blocks should take in the delta
                            this.blocks[i].draw(this.ctx);
                        }
                    }

                if (!this.player.dead && !this.player.win) {
                    this.player.draw(this.ctx);
                }


                    this.ctx.fill();
                    //UPDATE
                    for (let i = 0; i < this.blocks.length; i++) {
                        if (!this.blocks[i].broken) {
                            //todo the blocks should take in the delta
                            this.blocks[i].update();
                        }
                    }

                    //todo the blocks should take in the delta
                    this.player.update(this.lowestBlock, this.difficulty, this.blocks, this.blockOffset, this.ctx, this.holdingLeftKey, this.holdingRightKey);
                    this.setIndex(this.player.highestWordIndex);
                }
                this.showScore(this.player.yDistanceTravelled, this.score, this.ctx);
                this.then = this.now - (this.delta % this.interval);
            if(this.player.dead){
                if(!this.reported){
  //                  updateDoodleGame(this.id,"died",this.score);
                }
                this.reported = true;
            }


    }

}
//https://stackoverflow.com/questions/21333890/how-can-i-reduce-lag-in-the-following-html-5-canvas-game