import React from "react";
import "./letsdrag.css";

export default function Controls({
  moves,
  TOH,
  diskcount,
  solve,
  setdiskcount,
  timecount,
  settimecount,
}) {
  //handling disk count changes
  const handleDiskCountChange = (modifier) => {
    if (diskcount === 3 && modifier === -1)
      console.log("min disk coun't is 3!!");
    else if (diskcount === 15 && modifier === 1)
      console.log("max disk coun't is 15!!");
    else setdiskcount(diskcount + modifier);
  };

  return (
    <div className="controlsHolder">
      <div className="buttons">
        <div className="textbox">
          Moves: {moves}
        </div>
        <button onClick={() => solve()}>Solve</button>
        <button className="reset" onClick={() => window.location.reload()}>
          Reset
        </button>
      </div>
      <div className="second">
        <div className="diskcountholder">
          <div className="textbox"><p>Disks: {diskcount}</p></div>
          <button onClick={() => handleDiskCountChange(1)}>⬆️</button>
          <button onClick={() => handleDiskCountChange(-1)}>⬇️</button>
        </div>
        <div className="timeInput">
          <div className="textbox"><p>{timecount}ms</p></div>
          <input
            type="range"
            min="0"
            max="10000"
            id="timecount"
            value={timecount}
            onChange={(e) => {
              settimecount(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
