import BHUtils from './BHUtils';
import Block from "./Block";
let U = new BHUtils();
let B = new Block();

export default class BlockGenerator {

    decoyIndex = 0;
    textIndex = 0;
    section = 0
    constructor(level,mainText,decoyText,config){
        this.level = level;
        this.mainText = mainText;
        this.decoyText = decoyText;
        this.config = config;

    }
    setIndex = (num) => {
        this.textIndex = num;
    }
    blockGenerator = (lowestBlock,blocks,blockOffset,difficulty,mainText) => {
        let i;
        if (lowestBlock === 0) {
            i = 1;
        } else {
            i = lowestBlock;
        }

        //blocks are numbered, run it 60 times
        for (i; i < lowestBlock + 60; i++) {
            //if theres room in the blocks array
            if (i >= blocks.length) {
                let type;
                let powerup = 0;
                let word;
                let wordType;
                let wordIndex;
                let x;
                let y;

                if (blocks[i-1].wordType === "decoyWord" || blocks[i-1].wordType === "spike"){
                    if(blocks[i-2].wordType === "decoyWord" || blocks[i-1].wordType === "spike") {
                        wordType = "textWord";
                    }
                    else {
                        wordType = this.generateWordType(i);
                    }
                }


                else if (blocks[i-1].wordType === "textWord"){
                    if(blocks[i-2] !== null && blocks[i-2].wordType === "textWord") {
                        if(blocks[i-3] !== null && blocks[i-3].wordType === "textWord"){
                            wordType = "decoyWord";
                        }
                        else {
                            wordType = this.generateWordType();
                        }
                    }
                    else {
                        wordType = this.generateWordType();
                    }
                }
                else {
                    wordType = this.generateWordType();
                }

                type = this.generateBlockType();




                if (powerup !== 0) {
                }
                else if (wordType === "textWord") {
                    powerup = this.generatePowerup(this.level);
                }

                [word,wordType,wordIndex] = this.attributeWordToBlock(wordType);


                //TODO should really be a param in main "blocksize"
                x = Math.random()*(U.screenWidth - B.width);

                //TODO figure out the levels, max jump =~ 260
                if (wordType === "decoyWord" || blocks[i-1].wordType === "decoyWord") {
                    y = (blocks[i-1].y) - (((Math.random()*(U.adjustY(50) + (difficulty * U.adjustY(10)))) + U.adjustY(30) + blockOffset) * (2 / 3));
                } else if (wordType === "spike") {
                    y = (blocks[i-1].y) - ((Math.random()*(U.adjustY(50) + (difficulty *U.adjustY(10))))+U.adjustY(50) + blockOffset);
                }  else if (blocks[i-1].wordType === "spike") {
                    // blocks[i].y = (blocks[i-1].y) - ((Math.random()*(U.adjustY(80) + (difficulty*U.adjustY(25))))+U.adjustY(50) + blockOffset);
                    y = (blocks[i-1].y) - ((Math.random()*(U.adjustY(20) + (difficulty *U.adjustY(10)))) +U.adjustY(10)+ blockOffset);
                }
                else {
                    if(blocks[i-1].type === "sideways" || blocks[i-1].type === "rising"){
                        y = (blocks[i-1].y) - ((Math.random()*(U.adjustY(45) + (difficulty *U.adjustY(10))))+U.adjustY(40) + blockOffset);
                    }
                    else if(blocks[i-1].wordType === "textWord") {
                        y = (blocks[i - 1].y) - ((Math.random() * (U.adjustY(45) + (difficulty * U.adjustY(10)))) + U.adjustY(75) + blockOffset);
                    }
                    else {
                        y = (blocks[i - 1].y) - ((Math.random() * (U.adjustY(45) + (difficulty * U.adjustY(10)))) + U.adjustY(25) + blockOffset);
                    }

                }

                let last = false;
                if(this.textIndex === mainText.length){
                    if(wordType !== 'decoyWord'){
                        last = true;
                    }
                    else{
                        break;
                    }
                }
                if(this.textIndex > mainText.length){
                    break;
                }
                let block = new Block(x,y,powerup,type,word,wordType,wordIndex,last);
                blocks.push(block);
            }
        }

        //Remove blocks that are below us now
        for (let i = 0; i < lowestBlock - 2; i++) {
            blocks.shift();
        }
        if(this.section < 3){
            this.section++
        }
    }

    generatePowerup = (level) => {
        const powerupChances = {
            "easy": {
                "spring": this.config.easy.powerUps.spring,
                "orbBack": this.config.easy.powerUps.orbBack,
                "orbForward": this.config.easy.powerUps.orbForward
            },
            "hard": {
                "spring": this.config.hard.powerUps.spring,
                "orbBack": this.config.hard.powerUps.orbBack,
                "orbForward": this.config.hard.powerUps.orbForward
            }
        };

        if (Math.round(Math.random() * powerupChances[level]["spring"]) === 0) {
            return "spring";
        } else if(Math.round(Math.random() * powerupChances[level]["orbBack"]) === 0) {
            return "orbBack";
        } else if(Math.round(Math.random() * powerupChances[level]["orbForward"]) === 0) {
            return "orbForward";
        }
        return 0;
    }

    generateBlockType = () => {
        const blockChances = {
            //1 out of every 15 block TODO this is where we will come up with the decoys, probably 1/4,
            "sideways": this.config.hard.blockTypeFreq.sideways * ((5 - this.section )/5),
            "rising": this.config.hard.blockTypeFreq.rising * ((5 - this.section )/5)
        };


        if (Math.round(Math.random() * blockChances["sideways"]) === blockChances["sideways"]) {
            return "sideways" ;
        } else if (Math.round(Math.random() * blockChances["rising"]) === blockChances["rising"]) {
            return "rising";
        }
        return "regular";
    }

    generateWordType = (index) => {
        const wordChances = {
            "spike": this.config.hard.wordTypeFreq.spike,
            "textWord": 1
        }
        if (index > 5 && Math.round(Math.random()* wordChances["spike"]) === wordChances["spike"]){
            return "spike"
        }
        else if (Math.round(Math.random()* wordChances["textWord"]) === wordChances["textWord"]) {
            return "textWord";
        }
        else {
            return "decoyWord";
        }

    }



    attributeWordToBlock = (wordType) => {
        let word;
        let wordIndex;
        if(wordType === "textWord"){
            word = this.mainText[this.textIndex];
            wordIndex = this.textIndex;
            this.textIndex++;
        }
        else if(wordType === "decoyWord"){
            //textNumber = this.decoyIndex;
            if(this.level === "hard"){
                word = this.decoyText[this.decoyIndex];
            }
            else{
                //word = "בַשָּׁמַיִם-הִוא";
                if(this.decoyIndex % 2 === 0){
                    word = "בשמים היא";
                }
                else{
                    word = "";
                }
            }
            wordIndex = this.decoyIndex;
            this.decoyIndex++;
        }
        else{
            wordIndex = 0;
            word = "";
        }
        return [word,wordType,wordIndex];
    }
}