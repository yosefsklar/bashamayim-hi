import React, {Component} from 'react';
import BHRound from "./BHRound";

export default class BHGame extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    setGameDefault = () => {
        console.log("New game")
    }

    continueGame = () =>{
        console.log("Continue game")
    }

    render() {
     return (
         <BHRound
             level = {"hard"}
             newGame = {this.setGameDefault}
             continueGame = {this.continueGame}
    />
     );
    }
}