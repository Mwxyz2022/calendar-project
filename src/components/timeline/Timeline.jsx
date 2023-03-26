import React from 'react';
import PropTypes from 'prop-types';

import './timeline.scss';

const Timeline = ({ position }) => {
  const styleTimeline = { top: position };

  return (
    <div className="timeline" style={styleTimeline}>
      <div className="timeline__line"></div>
      <span className="timeline__point"></span>
    </div>
  );
};

Timeline.propTypes = {
  position: PropTypes.string.isRequired,
};
export default Timeline;
