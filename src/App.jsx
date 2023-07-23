import { Fragment, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import copyLogo from "./assets/images/icon-copy.svg";
import checked from "./assets/images/icon-check.svg";
import rightArrow from "./assets/images/icon-arrow-right.svg";
import favIcon from "./assets/images/favicon-32x32.png";

import classes from "./App.module.scss";

function App() {
  const [password, setPassword] = useState("");
  const [passwordCopyed, setPasswordCopyed] = useState("");

  const [characterLength, setCharacterLength] = useState("0");

  const [checkBoxIsChecked, setCheckBoxIsChecked] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  console.log(checkBoxIsChecked);

  const generatedPasswordCopyHandler = function () {
    navigator.clipboard.writeText(password).then(() => {
      setPasswordCopyed("COPYED");
      setTimeout(() => setPasswordCopyed(""), "3000");
    });
  };

  return (
    <div className={classes.app}>
      <h1 className={classes.header}>Password Generator</h1>
      <div className={classes["generated-password"]}>
        <p
          data-placeholder="P4$5W0rD!"
          //  contenteditable
        >
          {password}
        </p>
        <span>{passwordCopyed}</span>
        <button type="" onClick={generatedPasswordCopyHandler}>
          <img src={copyLogo} alt="" />
        </button>
      </div>
      <div className={classes["password-generator"]}>
        <div className={classes["character-length"]}>
          <label htmlFor="password-length">Character Length</label>
          <span>{characterLength}</span>
        </div>
        <input
          className={classes["character-length"]}
          value={characterLength}
          onChange={(e) => setCharacterLength(e.target.value)}
          type="range"
          name="password-length"
          id="password-length"
          min="0"
          max="20"
        />

        <div className={classes["character-types"]}>
          <div>
            {/* <input type="checkbox" name="upperCase" id="upperCase" /> */}
            <div
              onClick={() =>
                setCheckBoxIsChecked((prevState) => {
                  return {
                    ...prevState,
                    uppercase: !checkBoxIsChecked.uppercase,
                  };
                })
              }
            >
              {checkBoxIsChecked.uppercase && <img src={checked} alt="" />}
            </div>
            <label htmlFor="upperCase">Include Uppercase Letters</label>
          </div>
          <div>
            <div
              onClick={() =>
                setCheckBoxIsChecked((prevState) => {
                  return {
                    ...prevState,
                    lowercase: !checkBoxIsChecked.lowercase,
                  };
                })
              }
            >
              {checkBoxIsChecked.lowercase && <img src={checked} alt="" />}
            </div>
            <label htmlFor="lowerCase">Include Lowercase Letters</label>
          </div>
          <div>
            <div
              onClick={() =>
                setCheckBoxIsChecked((prevState) => {
                  return {
                    ...prevState,
                    numbers: !checkBoxIsChecked.numbers,
                  };
                })
              }
            >
              {checkBoxIsChecked.numbers && <img src={checked} alt="" />}
            </div>
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div>
            <div
              onClick={() =>
                setCheckBoxIsChecked((prevState) => {
                  return {
                    ...prevState,
                    symbols: !checkBoxIsChecked.symbols,
                  };
                })
              }
            >
              {checkBoxIsChecked.symbols && <img src={checked} alt="" />}
            </div>
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>
        <button onClick={() => setPassword("gurama")}>
          GENERATE <img src={rightArrow} alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
