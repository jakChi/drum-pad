import { useState } from "react";
import { drumPads } from "./Data";
import "./Style.css";

const App = () => {
  const [currentPad, setCurrentPad] = useState({});
  const [powerState, setPowerState] = useState(false);
  const [notification, setNotification] = useState(null);

  //errors
  const POW_ERR = {
    type: "Power",
    content: "Power is off, you should click power switch to turn it on",
  };

  const TURN_ON = {
    type: "power",
    content: "Power On!",
  };

  const TURN_OFF = {
    type: "power",
    content: "Power Off!",
  };

  //controls popup notifications
  const handlePopups = (notif) => {
    setNotification(notif);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  //controls power state
  const handlePowerState = () => {
    setPowerState(!powerState);
    setCurrentPad({ value: null, name: null });
    powerState ? handlePopups(TURN_OFF) : handlePopups(TURN_ON);
  };

  const handleClick = (event, key) => {
    if (powerState) {
      for (let i = 0; i < drumPads.length; i++) {
        if (key === drumPads[i].keyTrigger) {
          setCurrentPad(drumPads[i]);
          const audio = document.getElementById(key);
          audio.play();
          break;
        }
      }
    } else {
      handlePopups(POW_ERR);
    }
  };

  const handleKeyDown = (event) => {
    if (powerState) {
      for (let i = 0; i < drumPads.length; i++) {
        if (event.keyCode === drumPads[i].keyCode) {
          setCurrentPad(drumPads[i]);
          const audio = document.getElementById(event.key.toUpperCase());
          audio.play();
          break;
        }
      }
    } else {
      handlePopups(POW_ERR);
    }
  };

  return (
    <>
      {notification ? (
        <div className="notification">
          <h2>Type: {notification.type}</h2>
          <p>{notification.content}</p>
        </div>
      ) : null}
      <div id="drum-machine" onKeyDown={handleKeyDown} autoFocus>
        <div className={`${powerState ? "onDot" : "offDot"} dot1`}></div>
        <div className={`${powerState ? "onDot" : "offDot"} dot2`}></div>
        <div className={`${powerState ? "onDot" : "offDot"} dot3`}></div>
        <div className={`${powerState ? "onDot" : "offDot"} dot4`}></div>
        <div id="controls">
          <button
            className={powerState ? "powBtn clicked" : "powBtn"}
            onClick={() => handlePowerState()}
          >
            {powerState ? (
              <div className="on">&#x23FD;</div>
            ) : (
              <div className="off">&#x2B58;</div>
            )}
          </button>
        </div>
        <div id="drum-pads">
          {drumPads.map((pad, i) => (
            <button
              className={
                currentPad.keyTrigger === pad.keyTrigger
                  ? "drum-pad active"
                  : "drum-pad"
              }
              id={pad.id}
              key={i}
              onClick={() => handleClick(event, pad.keyTrigger)}
            >
              <audio src={pad.url} className="clip" id={pad.keyTrigger}></audio>
              {pad.keyTrigger}
            </button>
          ))}
        </div>
        <div id="display" className={powerState ? "onDisplay" : "offDisplay"}>
          <h3>pad key: {currentPad.keyTrigger}</h3>
          <h3>pad name: {currentPad.id}</h3>
        </div>
      </div>
    </>
  );
};

export default App;
