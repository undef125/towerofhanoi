import React, { useState } from "react";
import "./letsdrag.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LetsDrag({
  setId,
  id,
  setMoves,
  moves,
  dummyarray,
  minmmoves,
}) {
  const dragging = (e) => {
    setId("");
    //only allowing the 1st child to be draggable
    if (e.target.parentElement.firstChild === e.target) {
      setId(e.target.id);
      console.log("dragging");
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
        if (
          e.target.id === "section3" &&
          e.target.childNodes.length === dummyarray.length
        ) {
          console.log(moves);
          if (moves + 1 === minmmoves) {
            toast.success("Congrats finished with minimum steps!!", {
              autoClose: 1000,
              toastId: "manual",
            });
          } else {
            toast.success("Congrats finished!!", {
              autoClose: 1000,
              toastId: "manual",
            });
          }
        }
      } catch (error) {
        console.log("can't drop!!");
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div className="sections">
        <ToastContainer />
        <SectionOne
          dragging={dragging}
          dragOver={dragOver}
          dragDropped={dragDropped}
          dummyarray={dummyarray}
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

function SectionOne({ dragging, dragOver, dragDropped, dummyarray }) {
  let i = 0;

  return (
    <div
      className="section1holder"
      id="section1"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragDropped(e)}
    >
      {dummyarray.map((color) => {
        i++;
        return (
          <div
            id={`disk${i}`}
            className="disk"
            style={{
              width: `${i + 2}rem`,
            }}
            draggable
            onDrag={(e) => dragging(e)}
          ></div>
        );
      })}
    </div>
  );
}

function SectionTwo({ dragOver, dragDropped }) {
  return (
    <div
      className="section2holder"
      id="section2"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragDropped(e)}
    >
    </div>
  );
}

function SectionThr({ dragOver, dragDropped }) {
  return (
    <div
      className="section2holder"
      id="section3"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragDropped(e)}
    >
    </div>
  );
}
