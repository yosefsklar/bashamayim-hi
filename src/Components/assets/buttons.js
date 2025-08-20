import React from "react";
import classes from "../../styles/Buttons.module.css";

export const BtnConfig = (props) => {
  return (
    <button className={"col-sm " + classes.Btn + " " + classes.Config} onClick={() => props.setConfig(props.response)}>
      {props.children}
    </button>
  );
};

export const BtnConfigSmall = (props) => {
  return (
    <button
      className={"col-sm " + classes.Btn + " " + classes.Config + classes.Small}
      onClick={() => props.setConfig(props.response)}
    >
      {props.children}
    </button>
  );
};

export const BtnConfigWide = (props) => {
  let title = <h3>{props.title}</h3>;
  return (
    <div className={"col"}>
      {props.title && title}
      <button
        className={classes.Btn + " " + classes.Config + " " + classes.Wide}
        onClick={() => props.setConfig(props.response)}
      >
        {props.children}
      </button>
    </div>
  );
};

export const BtnBig = (props) => {
  return (
    <button className={classes.Btn + " " + classes.Big} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export const BtnAnswer = (props) => {
  return (
    <div className={"col-sm "}>
      <button
        className={classes.Btn + " " + classes.Answer}
        onClick={() => props.resetRoundHandler(props.label.correct ? (4 - props.clue) * 100 : 0, props.label.correct)}
      >
        <p>{props.label.textNameHebrew}</p>
        <p>{props.label.textNameEnglish}</p>
      </button>
    </div>
  );
};

export const BtnSmall = (props) => {
  return (
    <div className={"col-sm "}>
      <button className={classes.Btn + " " + classes.Small} onClick={props.onClick}>
        <p>{props.children}</p>
      </button>
    </div>
  );
};
