export default class BHUtils {
    //TODO more advanced logic

    screenHeight;
    screenWidth;

    constructor() {
        this.setDimensions()
    }
    setDimensions = () =>{
        //TODO clean this logic up
        if (window.screen.width < 500) {
            this.screenWidth = window.screen.width;
            this.screenHeight = this.screenWidth * (1.76);
        }
        else if (window.innerHeight >= 1000){
            this.screenHeight = 1000;
            this.screenWidth = this.screenHeight * (5/8)
        }
        else if (window.innerHeight >= 800){
            this.screenHeight = 800;
            this.screenWidth = this.screenHeight * (5/8)
        }
        else { 
            this.screenHeight = 650;
            this.screenWidth = this.screenHeight * (5/8);
        }

    }
    roundedRect = (ctx, x, y, width, height, radius) =>{
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.fill();
        ctx.stroke();
    }

    downwardTriangle = (ctx, centerTopX, centerTopY,height, base) => {
            ctx.beginPath();
            ctx.moveTo(centerTopX, centerTopY);
            ctx.lineTo(centerTopX + base, centerTopY + height);
            ctx.lineTo(centerTopX + (base * 2), centerTopY);
            ctx.fill();
    }

    adjustY = (value) =>{
        return (value / 800) * this.screenHeight;
    }
    adjustX = (value) =>{
        return (value / 600) * this.screenWidth;
    }

}



