import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import './timeline.scss';

const Timeline = ({ dataHour, day }) => {
  const now = moment();
  const isShowLine = now.isSame(day, 'day') && dataHour === now.hour();
  const [showLine, setShowLine] = useState(isShowLine);

  const [currentMinute, setCurrentMinute] = useState(moment().minute());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowLine(isShowLine);
      setCurrentMinute(moment().minute());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const styleTimeline = { top: `${currentMinute}px` };

  return showLine ? (
    <div className="timeline" style={styleTimeline}>
      <div className="timeline__line"></div>
      <span className="timeline__point"></span>
    </div>
  ) : null;
};

Timeline.propTypes = {
  dataHour: PropTypes.number.isRequired,
  day: PropTypes.instanceOf(moment).isRequired,
};

export default Timeline;
