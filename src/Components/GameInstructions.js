import Modal from "Components/assets/Modal";
import {BtnSmall} from "Components/assets/buttons";
import React from "react";
import classes from 'styles/GameInstructions.module.css';
import instructions1 from 'Images/instructions1.PNG';
import instructions2 from 'Images/instructions_spike.PNG';
import instructions3 from 'Images/blank_block.PNG';
import instructions4 from 'Images/hard_block.PNG';
import instructions5 from 'Images/bashamayim_hi_block.PNG';
import instructions6 from 'Images/powerup.PNG';

const GameInstructions = (props) => {
    return (
        <Modal>
            <h1>בשמים היא</h1>
            <h2>Instructions</h2>
            <div className={classes.instructions}>
                <ul>
                    <li>Jump from block to block to get as high as you can!</li>
                    <li>Use the left and right arrow keys to move</li>
                    <li>You may only step on the blocks that contain words that
                        are the continuation of the text that you selected.
                        (You need not land on these blocks in order or consecutively.)
                    </li>
                    <div className={classes.picture}>
                        <img src={instructions1} alt="player jumping from block to block" height="200"/>
                    </div>
                    <li>Easy: Decoy blocks will be blank or "bashamayim hi" blocksnp</li>
                    <div className={classes.picture}>
                        <img src={instructions3} alt="blank block" height="50"/>
                        <img src={instructions5} alt="bashamayim hi block" height="50"/>
                    </div>
                    <li>Hard: Decoy blocks will have other words from Tanakh written on them</li>
                    <div className={classes.picture}>
                        <img src={instructions4} alt="hard gameplay" width="250" />
                    </div>
                    <li>Avoid the spiked blocks! Though you can land on top of them if you'd like.</li>
                    <div className={classes.picture}>
                        <img src={instructions2} alt="spike block" height="125"/>
                    </div>
                    <li>Powerup</li>
                    <div className={classes.picture}>
                        <img src={instructions6} alt="powerup"  height="75"/>
                    </div>
                </ul>
            </div>
            <div>
                <BtnSmall onClick={props.setGameDefault}>Back</BtnSmall>
            </div>
        </Modal>
    );
}
export default GameInstructions;

