import React from 'react';
import Roll from './Roll';
import "./style.css"

const RollButtons = ({pins_remaining, handlePinPoints}) =>  {

  let pins = Array.from(Array(pins_remaining+1), (x,index) => index )

  return (
    <div>
      <div className="rolls">
        {pins.map((i)=> (
          <Roll key={i} number={i} handlepoints={handlePinPoints}/>
        ))}
      </div>
    </div>
  )};

export default RollButtons;