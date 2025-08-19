import React from 'react';
import classes from '../styles/GameCustomText.module.css';
import Modal from './assets/Modal';
import {TextChapters} from '../Resources/texts';
import GameCustomChapter from "./GameCustomChapter";
import {BtnConfigSmall, BtnSmall} from "./assets/buttons";

const GameCustomText = (props) => {

    let dropdownArray = Object.keys(TextChapters["tanakh"]).map(function(key, index) {
        return( <button className="dropdown-item" type="button" onClick={() => props.setText(key)}>{key.split("_").join(" ")}</button>);
    });

    let chooseLevel =   (<div className={'row'}>
        <BtnConfigSmall setConfig={() => props.setLevel('easy')}>Easy</BtnConfigSmall>
        <BtnConfigSmall setConfig={() => props.setLevel('hard')}>Hard</BtnConfigSmall>
    </div>)

    return (
        <Modal>
            <h1>בשמים היא</h1>
            <p>Please choose a Sefer</p>
            <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    {props.textName}
                </button>
                <div className={"dropdown-menu dropdown-menu-right " + classes.scrollable_menu}>
                    {dropdownArray}
                </div>
            </div>
            <GameCustomChapter setStartChapter={props.setStartChapter} textUrlName={props.textUrlName}  startChapter={props.startChapter} setGameDefault={props.setGameDefault}/>
            <div className={'container'}>
                {(props.textName !== "Sefarim" && props.startChapter !== "Chapters") && chooseLevel}
            </div>
            <div style={{textAlign: 'left'}}>
                <BtnSmall onClick={props.setGameDefault}>Back</BtnSmall>
            </div>
        </Modal>
    )
}

export default GameCustomText;