import React, {PropTypes} from 'react';

const Roll = ({number, handlepoints}) => (
  <button onClick={()=> {handlepoints(number)}}
    type="button">
    {number}
  </button>
);

Roll.propTypes = {
  number: PropTypes.number.isRequired
};

export default Roll;