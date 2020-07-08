import React, {Component} from 'react';

export default class CanvasDemo extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas =() =>{
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
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