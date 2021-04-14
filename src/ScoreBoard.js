import React from 'react';
import Frame from './Frame';

const ScoreBoard = (props) => {
  return (
    <div className="scoreboard">
      <div className="frames">
        {props.scorecard_status.map(({firstShot, secondShot, score, thirdShot, i}) => (
          <Frame
            key={i}
            first_shot={firstShot}
            second_shot={secondShot}
            total_frame_score={score} third_shot={thirdShot}/>
        ))}
      </div>
      <h1>Game Score = {props.full_score}</h1>
    </div>
  );
};

export default ScoreBoard;