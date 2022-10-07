import React, { useState } from "react";
import "./letsdrag.css";

function SectionOne({ dragging, dragOver, dragDropped, diskcount }) {
  let dummyarray = [];
  let i = 0;
  for (let i = 0; i < diskcount; i++) {
    dummyarray.push(Math.random());
  }
  return (
    <div
      className="section1holder"
      id="section1"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragDropped(e)}
    >
      {dummyarray.map((dummy) => {
        i++;
        return (
          <div
            id={`disk${i}`}
            className="disk"
            key={Math.random()}
            style={{
              width: `${i + 2}rem`,
              backgroundColor: `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`,
            }}
            draggable
            onDrag={(e) => dragging(e)}
          ></div>
        );
      })}
    </div>
  );
}

function SectionTwo({ dragging, dragOver, dragDropped }) {
  return (
    <div
      className="section2holder"
      id="section2"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragDropped(e)}
    ></div>
  );
}
function SectionThr({ dragging, dragOver, dragDropped }) {
  return (
    <div
      className="section2holder"
      id="section3"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragDropped(e)}
    ></div>
  );
}

export default function LetsDrag() {
  const [id, setId] = useState("");
  const [moves, setMoves] = useState(0);
  const [diskcount, setdiskcount] = useState(3);
  const [timecount, settimecount] = useState(0);
  let actions = [];

  const dragging = (e) => {
    setId("");
    //only allowing the 1st child to be draggable
    if (e.target.parentElement.firstChild === e.target) {
      setId(e.target.id);
    } else {
      e.preventDefault();
      console.log("can't be dragged ");
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragDropped = (e) => {
    if (e.target.firstChild === null || e.target.firstChild.id > id) {
      e.preventDefault();
      try {
        const el = id;
        const source = document.getElementById(el);
        e.target.appendChild(source);
        e.target.insertBefore(source, e.target.firstChild);
        setMoves(moves + 1);
      } catch (error) {
        console.log("can't drop!!");
      }
    } else {
      return;
    }
  };

  const display = (index) => {
    setTimeout(() => {
      // grab disk
      let disk = document.getElementById(`disk${actions[index].n}`);
      //remove disk from source
      let destination = document.getElementById(actions[index].desId);
      destination.insertBefore(disk, destination.firstChild);
    }, 1000);
  };

  const solve = async () => {
    TOH(diskcount, "section1", "section3", "section2");
    for (let i = 0; i < actions.length; i++) {
      setTimeout(display, i * timecount, i);
    }
  };
  const TOH = (n, sourceId, desId, auxId) => {
    if (n === 0) return;
    TOH(n - 1, sourceId, auxId, desId);
    actions.push({
      n,
      sourceId,
      desId,
    });
    console.log(`move disk ${n} from ${sourceId} to ${desId}`);
    TOH(n - 1, auxId, desId, sourceId);
  };

  return (
    <>
      <div className="controls">
        <div className="div" style={{ color: "white", fontSize: "1.2rem" }}>
          Moves: {moves}
        </div>
        <button
          onClick={() => TOH(diskcount, "section1", "section3", "section2")}
        >
          Get Answer
        </button>
        <button onClick={() => solve()}>Solve</button>
        <input
          type="number"
          min="3"
          id="inputdiskcount"
          value={diskcount}
          onChange={(e) => {
            setdiskcount(e.target.value);
          }}
        />
        <input
          type="number"
          min="0"
          id="timecount"
          value={timecount}
          onChange={(e) => {
            settimecount(e.target.value);
          }}
        />
      </div>
      <div className="sections">
        <SectionOne
          dragging={dragging}
          dragOver={dragOver}
          dragDropped={dragDropped}
          diskcount={diskcount}
        />
        <SectionTwo
          dragging={dragging}
          dragOver={dragOver}
          dragDropped={dragDropped}
        />
        <SectionThr
          dragging={dragging}
          dragOver={dragOver}
          dragDropped={dragDropped}
        />
      </div>
    </>
  );
}

{
  /* <svg height="210" width="200">
<line
  x1="100"
  y1="0"
  x2="100"
  y2="200"
  style={{ stroke: "rgb(82,180,238)", strokeWidth: "8" }}
/>
<line
  x1="0"
  y1="200"
  x2="200"
  y2="200"
  style={{ stroke: "rgb(82,180,238)", strokeWidth: "8" }}
/>
</svg> */
}
