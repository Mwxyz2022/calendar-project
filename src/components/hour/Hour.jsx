import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import RedLine from '../redLine/RedLine.jsx';
import Event from '../event/Event.jsx';

const Hour = ({ dataHour, day, hourEvents, setEvents }) => {
  const now = moment();

  const [redlinePosition, setRedlinePosition] = useState(`${now.minute()}px`);

  const isCurrentDate = now.isSame(day, 'day');
  const showLine = isCurrentDate && dataHour === now.hour();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedlinePosition(`${now.minute()}px`);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="calendar__time-slot" data-hour={dataHour}>
      {showLine && <RedLine position={redlinePosition} />}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStartTime = moment(dateFrom).format('HH:mm');
        const eventEndTime = moment(dateTo).format('HH:mm');
        const timeStrForEvent = `${eventStartTime} - ${eventEndTime}`;

        const height = (dateTo - dateFrom) / (1000 * 60);
        const marginTop = moment(dateFrom).get('minute');

        return (
          <Event
            key={id}
            id={id}
            startEventDate={dateFrom}
            height={height}
            marginTop={marginTop}
            time={timeStrForEvent}
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
  day: PropTypes.instanceOf(moment).isRequired,
  hourEvents: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Hour;
