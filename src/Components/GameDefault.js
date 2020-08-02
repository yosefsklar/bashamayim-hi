import React from 'react';
import classes from '../styles/GameCustomText.module.css';
import Modal from './assets/Modal';
import {BtnConfigSmall, BtnConfigWide} from "./assets/buttons";

const GameDefault = (props) => {

    let options =   (<div className={'row'}>
            <BtnConfigWide setConfig={props.setParsha} title={"Parshat Hashavua"}>{props.parsha.textName}</BtnConfigWide>
            <BtnConfigWide setConfig={props.setHaftorah} title={"Haftorat Hashavua"}>{props.haftorah.textName}</BtnConfigWide>
            <div className="w-100"></div>
            <BtnConfigWide setConfig={props.set929} title={"929"}>{props.nine.textName}</BtnConfigWide>
            <BtnConfigWide setConfig={props.setCustom} title={"Custom"}>Choose Text</BtnConfigWide>


        </div>
    )



    return (
        <Modal>
            <h1>Game: בשמים היא</h1>
            <p>Select a text</p>
            {options}
        </Modal>
    )
}

export default GameDefault;

export const GameDefaultLevel = (props) => {
    return (
        <Modal>
            <h1>Game: בשמים היא</h1>
            <p>Select a level</p>
            <div className={'row'}>
                <BtnConfigWide setConfig={() => props.setLevel('easy')}>Easy</BtnConfigWide>
                <BtnConfigWide setConfig={() => props.setLevel('hard')}>Hard</BtnConfigWide>
            </div>
        </Modal>
    );
}

