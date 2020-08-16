import React, {Component} from 'react';
import BHRound from "./BHRound";
import GameCustomText from "../Components/GameCustomText";
import GameInstructions from "../Components/GameInstructions";
import {Switch, Route} from "react-router-dom";

import GameDefault, {GameDefaultLevel} from "../Components/GameDefault";


const GameState = {
    "default" : 1,
    "play" : 2,
    "start" : 3,
    "custom": 4,
    "level" : 5,
    "instruction": 6
}

export default class BHGame extends Component {

    constructor(props) {
            super(props);
            this.state = {
                textUrlName: '',
                startChapter: 'Chapters',
                startVerse: 0,
                endChapter: 0,
                endVerse: 0,
                textName: 'Sefarim',
                level:'',
                parsha: new TextItem('',0,"",0),
                haftorah: new TextItem("",0,"",0),
                nine: new TextItem("",0,"",0),
                gameState: GameState.default
            };

    }

    componentDidMount() {
        let fetchString = 'https://www.sefaria.org/api/calendars';
        return fetch(fetchString)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.retrieveParsha(data, data.calendar_items.findIndex(item =>  item.title.en === "Parashat Hashavua"));
                this.retrieveHaftorah(data, data.calendar_items.findIndex(item =>  item.title.en === "Haftarah"));
                this.retrieve929(data, data.calendar_items.findIndex(item =>  item.title.en === "929"));
                this.setGameDefault();
            }).catch((err)=> {
                console.log(err);
            })
    }


    //TODO add rules for when it is multi parsha vs single
    //"Genesis.6.9-11.32"
    //"Genesis.12.1-17.27"
    retrieveParsha = (data,index) =>{
        let text = data.calendar_items[index].url.split("-")[0].split(".");
        let parshaTextUrlName = text[0];
        let parshaStartChapter = parseInt(text[1]);
        let parshaName = data.calendar_items[index].displayValue.en.split("-")[0];
        let parshaStartVerse = parseInt(data.calendar_items[index].url.split("-")[0].split(".")[2])
        let parshaEnd = data.calendar_items[index].url.split("-")[0].split(".")[0] +
            data.calendar_items[index].url.split("-")[1];
        let parshaEnding = data.calendar_items[index].url.split("-")[1];
        let parshaEndVerse;
        let parshaEndChapter;
        if(parshaEnding.includes('.')){
            parshaEndChapter = parseInt(parshaEnding.split('.')[0]);
            parshaEndVerse = parseInt(parshaEnding.split('.')[1]);

        }
        else{
            parshaEndVerse = parseInt(parshaEnding);
            parshaEndChapter = parshaStartChapter;
        }

        this.setState({
            parsha : new TextItem(parshaTextUrlName,parshaStartChapter,parshaName,parshaEndChapter,parshaStartVerse, parshaEndVerse)
        })
    }
    //"Isaiah.54.1-55.5"
    //Isaiah 40:27-41:16"
    retrieveHaftorah = (data,index) =>{
        let text = data.calendar_items[index].url.split("-")[0].split(".");
        let haftorahText = text[0];
        let haftorahStartChapter = parseInt(text[1]);
        let haftorahName = data.calendar_items[index].displayValue.en;
        let haftorahStartVerse = parseInt(data.calendar_items[index].url.split("-")[0].split(".")[2])
        let haftorahEnding = data.calendar_items[index].url.split("-")[1];
        let haftorahEndVerse;
        let haftorahEndChapter;
        if(haftorahEnding.includes('.')){

            haftorahEndChapter = parseInt(haftorahEnding.split('.')[0]);
            haftorahEndVerse = parseInt(haftorahEnding.split('.')[1]);

        }
        else{
            haftorahEndVerse = parseInt(haftorahEnding);
            haftorahEndChapter = haftorahStartChapter;
        }


        this.setState({
            haftorah : new TextItem(haftorahText, haftorahStartChapter, haftorahName, haftorahEndChapter, haftorahStartVerse, haftorahEndVerse)
        })

    }

    retrieve929 =(data,index)=>{
        let text = data.calendar_items[index].url.split("-")[0].split(".");
        let nineText = text[0];
        let nineStart = parseInt(text[1]);
        let nineName = data.calendar_items[index].displayValue.en;
        let nineEnd = data.calendar_items[index].url.split("-")[0].split(".")[0] +
            data.calendar_items[index].url.split("-")[1];


        this.setState({
            nine : new TextItem(nineText,nineStart,nineName,nineEnd)
        })
    }

    setParsha = () =>{
        this.setState({
            textUrlName : this.state.parsha.textUrlName,
            textName : this.state.parsha.textName,
            startChapter : this.state.parsha.startChapter,
            startVerse: this.state.parsha.startVerse,
            endChapter: this.state.parsha.endChapter,
            endVerse: this.state.parsha.endVerse,
            gameState: GameState.level
        }
        //,() => this.props.history.push(`${this.props.match.url}/gamePlay`)
        )
    }
    //TODO see if the non multitext logic is ever used, if not delete
    setHaftorah = () =>{
        this.setState({
            textUrlName : this.state.haftorah.textUrlName,
            textName : this.state.haftorah.textName,
            startChapter : this.state.haftorah.startChapter,
            startVerse: this.state.haftorah.startVerse,
            endChapter: this.state.haftorah.endChapter,
            endVerse: this.state.haftorah.endVerse,
            gameState: GameState.level
        }
        //,
         //   () => this.props.history.push(`${this.props.match.url}/gameDefaultLevel`)
        )
    }

    set929 = () =>{
        this.setState({
            textUrlName : this.state.nine.textUrlName,
            textName : this.state.nine.textName,
            startChapter : this.state.nine.startChapter,
            gameState: GameState.level
        }
        //, () => this.props.history.push(`${this.props.match.url}/gameDefaultLevel`)
        )
    }

    setCustom = () =>{
        this.setState({
            gameState: GameState.custom
        })
        //this.props.history.push(`${this.props.match.url}/gameCustomText`);
    }

    setGamePlay = () =>{
        this.setState({
            gameState: GameState.play
        })
        //this.props.history.push(`${this.props.match.url}/gameCustomText`);
    }


    setInstruction = (chapter) => {
        this.setState({
            gameState: GameState.instruction
        })
    }


    setLevel = (level) => {
        this.setState({
            level : level,
            gameState: GameState.play
        },
          //  () => this.props.history.push(`${this.props.match.url}/gamePlay`)
        )
    }

    //TODO rename
    setText = (text) => {
        this.setState({
            textName : text,
            textUrlName: text.replace(/_/g)
        })
    }

    setStartChapter = (chapter) => {
        this.setState({
            startChapter : chapter
        })
    }


    setGameDefault = () => {
        this.setState({
            //           gameDefault: true,
            //           gamePlay: false,
            textUrlName: '',
            startChapter: 'Chapters',
            textName: 'Sefarim',
            startVerse: 0,
            endChapter: 0,
            endVerse: 0,
            level: '',
            gameNumber: this.state.gameNumber + 1,
            gameState: GameState.default
        }
        //, () => this.props.history.push(`${this.props.match.url}/gameDefault`)
        )
    }



    continueGame = () =>{
    }


    render() {
        let toRender;
        if (this.state.gameState == GameState.default){
            toRender = (
                <GameDefault setParsha={this.setParsha}
                             parsha={this.state.parsha}
                             setHaftorah={this.setHaftorah}
                             haftorah={this.state.haftorah}
                             set929={this.set929}
                             nine={this.state.nine}
                             setCustom={this.setCustom}
                             textUrlName={this.state.textUrlName}
                             startChapter={this.state.startChapter}
                             setInstruction={this.setInstruction}/>)
        }
        else if (this.state.gameState == GameState.play){
            toRender = (<BHRound
                level={this.state.level}
                newGame = {this.setGameDefault}
                continueGame = {this.continueGame}
                text={this.state.textUrlName}
                startChapter={this.state.startChapter}
                endChapter={this.state.endChapter}
                startVerse={this.state.startVerse}
                endVerse={this.state.endVerse}
            />)
        }
        else if (this.state.gameState == GameState.custom){
            toRender = (<GameCustomText setText={this.setText}
                                textName={this.state.textName}
                                textUrlName={this.state.textUrlName}
                                startChapter={this.state.startChapter}
                                setStartChapter={this.setStartChapter}
                                setGamePlay={this.setGamePlay}
                                setGameDefault={this.setGameDefault}
                                setLevel={this.setLevel}/>
            )
        }
        else if (this.state.gameState == GameState.instruction){
            toRender = (<GameInstructions
                    setGameDefault={this.setGameDefault}
                />
            )
        }
        else if (this.state.gameState == GameState.level){
            toRender = (<GameDefaultLevel setLevel={this.setLevel}
                                          setGameDefault={this.setGameDefault}
                                          textName={this.state.textName}
                                            />)
        }
        return (
            <div>
                {toRender}
            </div>

        );
    }
}

/*
*  For parshiyot "textName" refers to name of parsha, texturlname refers to name of Sefer
* */
class TextItem {
    constructor(textUrlName,startChapter,textName,endChapter, startVerse = 0, endVerse = 0){
        this.textUrlName = textUrlName;
        this.startChapter = startChapter;
        this.textName = textName;
        this.endChapter = endChapter;
        this.startVerse = startVerse;
        this.endVerse = endVerse;
    }
}
