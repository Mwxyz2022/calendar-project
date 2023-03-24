import React, { useState, useEffect } from 'react';
import moment from 'moment/moment.js';
import PropTypes from 'prop-types';

import RedLine from '../redLine/RedLine.jsx';
import Event from '../event/Event.jsx';

import { formatTime } from '../../utils/timeUtils';

const Hour = ({ dataHour, dataDay, hourEvents, setEvents }) => {
  const now = moment();
  const showLine = dataDay === now.date() && dataHour === now.hour();

  const [redlinePosition, setRedlinePosition] = useState(`${now.minute()}px`);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentMinute = moment().minute();

      setRedlinePosition(`${currentMinute}px`);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="calendar__time-slot" data-time={dataHour}>
      {showLine && <RedLine redlinePosition={redlinePosition} />}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${moment(dateFrom).get('hour')}:${formatTime(
          moment(dateFrom).get('minute'),
        )}`;
        const eventEnd = `${moment(dateTo).get('hour')}:${formatTime(
          moment(dateTo).get('minute'),
        )}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo - dateFrom) / (1000 * 60)}
            marginTop={moment(dateFrom).get('minute')}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            setEvents={setEvents}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dataDay: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Hour;
