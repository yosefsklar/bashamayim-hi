import DJUtils from './DJUtils';
import redMonster from '../Sprites/Monsters/smallRed.png';
let U = new DJUtils();

export default class Monster {
    xDif = U.adjustX(27);
    yDif = U.adjustY(-10);
    width = U.adjustX(69);
    height = U.adjustY(60);

    constructor() {
        this.img = new Image();
        this.img.src = redMonster;
    }

    draw = (blockX,blockY,ctx) => {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

