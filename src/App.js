import "./App.css";
import LetsDrag from "./components/LetsDrag";
import Controls from "./components/Controls";
import AnswerPop from "./components/AnswerPop";
import React, { useState,useEffect } from "react";
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [id, setId] = useState("");
  const [moves, setMoves] = useState(0);
  const [diskcount, setdiskcount] = useState(3);
  const [timecount, settimecount] = useState(100);
  const [popmodel, setpopmodel] = useState(false);
  const [sequencearray, setsequencearray] = useState([]);
  let actions = [];

  let dummyarray = [];
  for (let i = 0; i < diskcount; i++) {
    dummyarray.push(Math.random());
  }

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
    setsequencearray(oldarray => [...oldarray,`move disk ${n} from ${sourceId} to ${desId}`]);
    TOH(n - 1, auxId, desId, sourceId);
  };

  const display = (index) => {
    setTimeout(() => {
      let disk = document.getElementById(`disk${actions[index].n}`);
      let destination = document.getElementById(actions[index].desId);
      destination.insertBefore(disk, destination.firstChild);
      setMoves(index + 1);
    }, 1000);
  };

  useEffect(() => {
    setsequencearray([])
    TOH(diskcount, "section1", "section3", "section2");
  }, [diskcount])
  



  return (
    <div className="App">
      <Controls
        moves={moves}
        TOH={TOH}
        diskcount={diskcount}
        solve={solve}
        setdiskcount={setdiskcount}
        timecount={timecount}
        settimecount={settimecount}
      />
      <LetsDrag
        dummyarray={dummyarray}
        timecount={timecount}
        id={id}
        setId={setId}
        moves={moves}
        setMoves={setMoves}
        minmmoves={sequencearray.length}
      />
      <div className="showanserdiv">
      <button className="showAnswer" onClick={() => {
        setsequencearray([]);
        TOH(diskcount, "section1", "section3", "section2");
        setpopmodel(!popmodel);
      }}>Show answer sequence</button>
      </div>
      {popmodel ? <AnswerPop setpopmodel={setpopmodel} sequencearray={sequencearray}/> : null}
    </div>
  );
}

export default App;
