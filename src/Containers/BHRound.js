import React, { Component } from "react";
// import {textWords, ecc, exodus} from "../Resources/text_samples";
import { removeHTML, cleanText, shuffleArray } from "../utils/textProcessingUtils";
import BHMain from "../gameplay/BHMain";
import classes from "styles/BHRound.module.css";
import { TextChapters } from "../Resources/texts";
import { BtnSmall } from "../Components/assets/buttons";

const gamePlayConfigs = require("../configs/gamePlayConfigs");

export default class BHRound extends Component {
  constructor() {
    super();
    this.state = {
      game: "",
      index: 0,
      gameProcessed: false,
      textHelper: false,
    };
  }

  componentDidMount() {
    this.updateCanvas();
    let textPromise;
    if (this.props.endChapter) {
      textPromise = this.fetchMultiChapterText();
    } else {
      textPromise = this.fetchSingleChapterText();
    }
    textPromise.then((textWords) => {
      return this.generateDecoyWords(this.props.text, textWords).then((decoyWords) => {
        let game = new BHMain(
          this.refs.canvas,
          this.props.level,
          textWords,
          decoyWords,
          1,
          this.props.newGame,
          this.props.continueGame,
          this.setIndex,
          gamePlayConfigs,
        );
        this.setState({
          game: game,
          gameProcessed: true,
          textWords: textWords,
        });
      });
    });
  }

  updateCanvas = () => {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillRect(0, 0, 100, 100);
  };

  //*
  // Takes a text, start chapter, start and end verse, returns a promise with data = array of full hebrew verse
  // */
  fetchSingleChapterText = () => {
    let fetchPromise;
    let fetchString =
      "https://www.sefaria.org/api/texts/" +
      this.props.text +
      "." +
      this.props.startChapter +
      "?custom=ashkenazi";
    fetchPromise = fetch(fetchString)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data["he"] = removeHTML(data.he);
        if (this.props.startVerse && this.props.endVerse) {
          data["he"] = data["he"].filter(
            (verse, index) => index >= this.props.startVerse - 1 && index < this.props.endVerse,
          );
        }
        return data["he"];
      })
      .then((data) => {
        return cleanText(data.join(" "));
      });
    return fetchPromise;
  };

  fetchMultiChapterText = () => {
    let difference = this.props.endChapter - this.props.startChapter + 1;
    let chapters = Array.from(new Array(difference), (x, i) => i + this.props.startChapter);
    return Promise.all(
      chapters.map((chapterNumber, index) => {
        let fetchString =
          "https://www.sefaria.org/api/texts/" +
          this.props.text +
          "." +
          chapterNumber +
          "?custom=ashkenazi";
        return fetch(fetchString)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            //now were return an array of promises that resolve to provide the hebrew text of its chapter
            return removeHTML(data.he);
          });
      }),
    )
      .then((chapterTexts) => {
        chapterTexts[0].splice(0, this.props.startVerse - 1);
        chapterTexts[chapterTexts.length - 1].splice(this.props.endVerse);
        let finalText = chapterTexts.flat();
        return finalText;
      })
      .then((data) => {
        return cleanText(data.join(" "));
      });
  };

  /*
   * Takes the text chosen for the game and the list of words that that text contains
   * Returns a list of decoy words
   * */
  generateDecoyWords = (text, textWords) => {
    let decoyTexts = [];
    let decoyChapters = [];
    for (let i = 0; i < 2; i++) {
      let keys = Object.keys(TextChapters["tanakh"]);
      let key = keys[Math.floor(Math.random() * keys.length)];
      let chapterNumber = Math.ceil(Math.random() * TextChapters["tanakh"][key]);
      decoyTexts.push(key);
      decoyChapters.push(chapterNumber);
    }

    return Promise.all(
      decoyTexts.map((chapterNumber, index) => {
        let fetchString =
          "https://www.sefaria.org/api/texts/" +
          decoyTexts[index] +
          "." +
          decoyChapters[index] +
          "?custom=ashkenazi";
        return fetch(fetchString)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            //now were return an array of promises that resolve to provide the hebrew text of its chapter
            return removeHTML(data.he);
          });
      }),
    ).then((decoyWordLists) => {
      let strippedWords = cleanText(
        this.verseListsToCleanedWords(decoyWordLists, textWords).join(" "),
      );
      // if there are fewer decoy words than text words, double the decoy words
      while (textWords.length * (5 / 4) > strippedWords.length) {
        strippedWords = strippedWords.concat(strippedWords);
      }
      console.log(textWords);
      console.log(strippedWords);
      return strippedWords;
    });
  };

  /*
   * Takes in two lists of words, returns an array of strings that are unique between them, shuffled
   * */
  verseListsToCleanedWords = (decoyVerseLists, textWords) => {
    let decoyWords = decoyVerseLists.flat();
    decoyWords = shuffleArray(
      decoyWords
        .join(" ")
        .split(/[\s\u05BE]+/)
        .filter((x) => this.checkOverlap(x, textWords)),
    );
    return decoyWords;
  };

  checkOverlap = (x, textWords) => {
    let noPrefix = textWords.map((x) => x.replace(/[\u0591-\u05C7]/g, "").substring(1));
    textWords = textWords.map((x) => x.replace(/[\u0591-\u05C7]/g, ""));
    if (!textWords.includes(x)) {
      if (!noPrefix.includes(x.replace(/[\u0591-\u05C7]/g, "").substring(1))) {
        if (!noPrefix.includes(x.replace(/[\u0591-\u05C7]/g, ""))) {
          if (!textWords.includes(x.replace(/[\u0591-\u05C7]/g, "").substring(1))) {
            return true;
          }
        }
      }
    }
  };

  setIndex = (i) => {
    this.setState({
      index: i,
    });
    console.log("setting index " + i);
  };

  setTextHelper = () => {
    console.log("textHelper");
    this.setState({
      textHelper: !this.state.textHelper,
    });
  };

  render() {
    return (
      <div className={"row " + classes.RoundContainer}>
        <div className={"col-sm "}>
          <p></p>
        </div>
        <div className={"col-sm " + classes.canvasWrap}>
          <canvas className={classes.Canvas} ref="canvas" width={0} height={0} />
        </div>

        {this.state.textHelper ? (
          <div className={"col-sm "}>
            <BtnSmall onClick={this.setTextHelper}>Hide Text</BtnSmall>
            <p className={classes.textBox}>
              {this.state.textWords.filter((v, i) => i <= this.state.index).join(" ")}
            </p>
          </div>
        ) : (
          this.state.gameProcessed && <BtnSmall onClick={this.setTextHelper}>Show Text</BtnSmall>
        )}
      </div>
    );
  }
}
