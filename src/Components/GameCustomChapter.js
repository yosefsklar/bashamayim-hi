import React from "react";
import classes from "../styles/GameCustomChapter.module.css";
import { TextChapters } from "../Resources/texts";

const GameCustomChapter = (props) => {
  let dropdownArray = <div></div>;
  if (props.textUrlName !== "Sefarim") {
    dropdownArray = Array.from(Array(TextChapters["tanakh"][props.textUrlName]).keys()).map(
      function (element, index) {
        return (
          <button
            className="dropdown-item"
            type="button"
            onClick={() => props.setStartChapter(element + 1)}
          >
            {element + 1}
          </button>
        );
      },
    );
  }

  return (
    <div>
      <p>Please choose a chapter</p>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {props.startChapter}
        </button>
        <div className={"dropdown-menu dropdown-menu-right " + classes.scrollable_menu}>
          {dropdownArray}
        </div>
      </div>
    </div>
  );
};

export default GameCustomChapter;
