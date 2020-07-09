import React, {Component} from 'react';
import {decoyWords, textWords} from "./text_samples";
import DJMain from "./gameplay/DJMain";

export default class BHRound extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {
        this.updateCanvas();
        let game = new DJMain(this.refs.canvas, this.props.level, textWords, decoyWords , 1, this.props.newGame, this.props.continueGame, this.setIndex);
    }

    updateCanvas =() =>{
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
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