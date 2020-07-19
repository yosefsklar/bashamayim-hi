import React, {Component} from 'react';
import BHRound from "./BHRound";

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
                parsha: new TextItem('',0,"",0),
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
            }).catch((err)=> {
                console.log(err);
            })
    }

    retrieveParsha = (data,index) =>{
        let text = data.calendar_items[index].url.split("-")[0].split(".");
        let parshaTextUrlName = text[0];
        let parshaStart = parseInt(text[1]);
        let parshaName = data.calendar_items[index].displayValue.en.split("-")[0];
        let parshaEnd = data.calendar_items[index].url.split("-")[0].split(".")[0] +
            data.calendar_items[index].url.split("-")[1];

        this.setState({
            parsha : new TextItem(parshaTextUrlName,parshaStart,parshaName,parshaEnd)
        })
    }


    setGameDefault = () => {
        console.log("New game")
    }

    continueGame = () =>{
        console.log("Continue game")
    }

    render() {
        let display;
        if(this.state.parsha.startChapter != 0){
            display = (
                <BHRound
                level = {"hard"}
                newGame = {this.setGameDefault}
                continueGame = {this.continueGame}
                text={this.state.parsha.textUrlName}
                startChapter={this.state.parsha.startChapter}
            />
            )
        }
        else {
            display = (<div></div>)
        }
        return (
            display
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