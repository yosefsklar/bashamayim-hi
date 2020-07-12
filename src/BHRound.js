import React, {Component} from 'react';
import {decoyWords, textWords, ecc, exodus} from "./text_samples";
import Utils from './Utils';
import DJMain from "./gameplay/DJMain";
import {TextChapters} from "./texts";

const U = new Utils();

export default class BHRound extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {
        this.updateCanvas();
        let decoywords = this.verseListsToCleanedWords([exodus,ecc])
        console.log(decoywords)
        let game = new DJMain(this.refs.canvas, this.props.level, textWords,decoywords, 1, this.props.newGame, this.props.continueGame, this.setIndex);
    }

    updateCanvas =() =>{
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }

    generateDecoyWords = (text, textWords) =>{
        let decoyTexts = [];
        let decoyChapters = [];
        for(let i = 0; i < 2; i++){
            let keys = Object.keys(TextChapters['tanakh']);
            let key = keys[Math.floor(Math.random() * keys.length)]
            let chapterNumber = Math.ceil(Math.random() * TextChapters['tanakh'][key]);
            decoyTexts.push(key);
            decoyChapters.push(chapterNumber);
        }

        return Promise.all(decoyTexts.map((chapterNumber, index) => {
            let fetchString = 'https://www.sefaria.org/api/texts/' + decoyTexts[index] + '.' + decoyChapters[index] + '?custom=ashkenazi';
            return fetch(fetchString)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    //now were return an array of promises that resolve to provide the hebrew text of its chapter
                    return U.removeHTML(data.he);
                })
        })).then( decoyWordLists => {
            return this. verseListsToCleanedWords(decoyWordLists);
        })
    }

    verseListsToCleanedWords = (decoyVerseLists) => {
        let decoyWords = decoyVerseLists.flat();
        decoyWords = this.shuffleArray(decoyWords.join(' ').split(/[\s\u05BE]+/).filter(x => this.checkOverlap(x,textWords)));
        return decoyWords;
    }

    shuffleArray = (array) =>  {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    checkOverlap = (x,textWords) =>{
        let noPrefix = textWords.map(x => x.replace(/[\u0591-\u05C7]/g,'').substring(1));
        textWords = textWords.map(x => x.replace(/[\u0591-\u05C7]/g,''));
        if(!textWords.includes(x)){
            if(!noPrefix.includes(x.replace(/[\u0591-\u05C7]/g,'').substring(1))){
                if(!noPrefix.includes(x.replace(/[\u0591-\u05C7]/g,''))){
                    if(!textWords.includes(x.replace(/[\u0591-\u05C7]/g,'').substring(1))){
                        return true;
                    }
                }
            }
        }
    }

    setIndex = () => {
        console.log("Index Set")
    }

  render() {
      let screenHeight = 800;
      let screenWidth = 500;
      screenHeight = window.screen.height;
      screenWidth = window.screen.height * (5/8);
        return (
            <canvas ref="canvas" width={screenWidth} height={screenHeight}/>
        );
  }
}