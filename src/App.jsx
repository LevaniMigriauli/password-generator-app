import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import copyLogo from "./assets/images/icon-copy.svg";

import classes from "./App.module.scss";

function App() {
  const [password, setPassword] = useState("");
  const [passwordCopyed, setPasswordCopyed] = useState("");

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
        <p data-placeholder="P4$5W0rD!" contenteditable>
          {password}
        </p>
        <span>{passwordCopyed}</span>
        <button type="" onClick={generatedPasswordCopyHandler}>
          <img src={copyLogo} alt="" />
        </button>
      </div>
      <div className={classes["password-generator"]}>
        <button onClick={() => setPassword("gurama")}></button>
      </div>
    </div>
  );
}

export default App;
