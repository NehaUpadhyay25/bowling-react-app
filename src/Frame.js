import React from 'react';

const Frame = (props) => {
  return (
  <div className="frame">
    <span>{props.first_shot}</span>
    <span>{props.second_shot}</span>
    {props.third_shot? <span>{props.third_shot}</span> : null}
    <p>{props.total_frame_score}</p>
  </div>
  );
};
export default Frame;