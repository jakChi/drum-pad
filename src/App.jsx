import { useState } from "react";
import { drumPads } from "./Data";
import "./Style.css";

const App = () => {
  const [currentPad, setCurrentPad] = useState({
    value: null,
    name: null,
    audioUrl: null,
  });
  const [powerState, setPowerState] = useState(false);
  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  //errors on notifications
  const POW_ERR = {
    type: "Power",
    content: "Power is off, you should click power switch to turn it on",
  };

  const MACHINE_ERR = {
    type: "Pad error",
    content: "Wrong key, you sould try one of this keys QWEASDZXC",
  };

  const NO_NOTIF = {
    type: "",
    content: "",
  };

  //controls popup notifications
  const handlePopups = (notif) => {
    setNotification(notif);

    setTimeout(() => {
      setNotification(NO_NOTIF);
    }, 4000);
  };

  //rogor gavushva audio roca buttonze davaklikeeeeeb

  const handlePowerState = () => {
    setPowerState(!powerState);
    setCurrentPad({ value: null, name: null });
  };

  const handlePlay = (e) => {
    if (powerState && e.type === "keydown") {
      for (let i = 0; i < drumPads.length; i++) {
        if (e.key.toUpperCase() === drumPads[i].value) {
          setCurrentPad({ value: drumPads[i].value, name: drumPads[i].name });
          const audio = new Audio(drumPads[i].audioUrl);
          audio.play();
          return;
        }
      }
      handlePopups(MACHINE_ERR);
    } else if (powerState && e.type === "click") {
      for (let i = 0; i < drumPads.length; i++) {
        let currentPad = drumPads[i];

        if (e.target.innerText === currentPad.value) {
          setCurrentPad({ value: currentPad.value, name: currentPad.name });
          const audio = new Audio(currentPad.audioUrl);
          audio.play();
          return;
        }
      }
    } else {
      handlePopups(POW_ERR);
    }
  };

  return (
    <>
      <div
        className={`notification ${
          notification.content != "" ? "active" : null
        }`}
      >
        <p>Error type: {notification.type}</p>
        <p>Error: {notification.content}</p>
      </div>
      <div id="drum-machine" onKeyDown={handlePlay} autoFocus>
        <div className={`${powerState ? "onDot" : "offDot"} dot1`}></div>
        <div className={`${powerState ? "onDot" : "offDot"} dot2`}></div>
        <div className={`${powerState ? "onDot" : "offDot"} dot3`}></div>
        <div className={`${powerState ? "onDot" : "offDot"} dot4`}></div>
        <div id="controls">
          <button
            className={powerState ? "powBtn clicked" : "powBtn"}
            onClick={() => handlePowerState()}
          >
            <i
              className={`${powerState ? "on" : "off"} fa-solid fa-power-off`}
            ></i>
          </button>
        </div>
        <div id="drum-pads">
          {drumPads.map((pad, i) => (
            <button
              className={
                currentPad.value === pad.value ? "drum-pad active" : "drum-pad"
              }
              id={pad.value}
              key={i}
              onClick={handlePlay}
            >
              {pad.value}
            </button>
          ))}
        </div>
        <div id="display" className={powerState ? "onDisplay" : "offDisplay"}>
          <h3>pad value: {currentPad.value}</h3>
          <br />
          <h3>pad name: {currentPad.name}</h3>
        </div>
      </div>
    </>
  );
};

export default App;
