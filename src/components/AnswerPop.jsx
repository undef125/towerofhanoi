import React from 'react'
import "./letsdrag.css";

export default function AnswerPop({setpopmodel, sequencearray}) {
  return (
    <div className="popupModelHolder" onClick={() => setpopmodel(false)}>
        <div className="answerSequenceholder">
            {sequencearray.map(sequence => <p className='indseq'>{sequence}</p>)}
        </div>
    </div>
  )
}
