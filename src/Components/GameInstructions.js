import Modal from "./assets/Modal";
import {BtnConfigWide, BtnSmall} from "./assets/buttons";
import React from "react";
import classes from '../styles/GameInstructions.module.css';
import instructions1 from '../Images/instructions1.PNG';
import instructions2 from '../Images/instructions_spike.PNG';

const GameInstructions = (props) => {
    return (
        <Modal>
            <h1>Game: בשמים היא</h1>
            <h2>Instructions</h2>
            <div className={classes.instructions}>
                <ul>
                    <li>Jump from block to block to get as high as you can!</li>
                    <li>You may only step on the blocks that contain words that
                        are the continuation of the text that you selected.
                        (You need not land on these blocks in order or consecutively.)
                    </li>
                    <div className={classes.picture}>
                        <img src={instructions1} alt="image of player jumping from block to block" width="300" height="200"/>
                    </div>
                    <li>Avoid the spiked blocks! Though you can land on top of them if you'd like.</li>
                    <div className={classes.picture}>
                        <img src={instructions2} alt="image of spike block" width="150" height="150"/>
                    </div>
                    <li>Use the left and right arrow keys to move</li>
                </ul>
            </div>
            <div>
                <BtnSmall onClick={props.setGameDefault}>Back</BtnSmall>
            </div>
        </Modal>
    );
}
export default GameInstructions;

