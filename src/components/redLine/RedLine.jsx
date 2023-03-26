import React from 'react';
import PropTypes from 'prop-types';

import './redline.scss';

const RedLine = ({ position }) => {
  const styleRedline = { top: position };

  return (
    <div className="redLine" style={styleRedline}>
      <div className="redLine__line"></div>
      <span className="redLine__point"></span>
    </div>
  );
};

RedLine.propTypes = {
  position: PropTypes.string.isRequired,
};
export default RedLine;
