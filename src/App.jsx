import { useState } from "react";
import { drumPads } from "./Data";
import "./Style.css";

const App = () => {
  const [currentPad, setCurrentPad] = useState({ value: "...", name: "..." });
  const [powerState, setPowerState] = useState(false);
  const [notification, setNotification] = useState({
    type: "",
    content: ""
  });

  //errors on notifications
  const POW_ERR = {
    type: "Power",
    content: "Power is off, you should click power switch to turn it on"
  };

  const MACHINE_ERR = {
    type: "Pad error",
    content: "Wrong key, you sould try one of this keys QWEASDZXC"
  };

  const NO_NOTIF = {
    type: "",
    content: ""
  };

  //control functions
  const handlePopups = (notif) => {
    setNotification(notif);

    setTimeout(() => {
      setNotification(NO_NOTIF);
    }, 3000);
  };

  const handleClick = (e) => {
    powerState
      ? setCurrentPad({ value: e.target.id, name: e.target.innerText })
      : handlePopups(POW_ERR);
  };

  const handleKeyDown = (e) => {
    if (powerState) {
      for (let i = 0; i < drumPads.length; i++) {
        if (e.key.toUpperCase() === drumPads[i].value) {
          setCurrentPad({value: drumPads[i].value, name: drumPads[i].name});
          return;
        }
      }
      handlePopups(MACHINE_ERR)
    } else {
      handlePopups(POW_ERR);
    }
  };

  return (
    <>
      <div className={`notification ${notification.content != "" ? "active" : null}`}>
        <p>Error type: {notification.type}</p>
        <p>Error: {notification.content}</p>
      </div>
      <div id="drum-machine" onKeyDown={handleKeyDown} autoFocus>
        <div id="controls">
          <button onClick={() => setPowerState(!powerState)}>
            Turn {powerState ? "Off" : "On"}
          </button>
        </div>
        <div id="display">
          {currentPad.value}-{currentPad.name}
        </div>
        <div id="drum-pads">
          {drumPads.map((pad, i) => (
            <button
              className={currentPad === pad.value ? "drum-pad active" : "drum-pad"}
              id={pad.value}
              key={i}
              onClick={handleClick}
            >
              {pad.value}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
