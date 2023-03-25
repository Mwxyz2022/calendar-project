import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Hour from '../hour/Hour.jsx';

import './day.scss';

const Day = ({ dayID, day, dayEvents, setEvents }) => {
  const hours = Array(24)
    .fill()
    .map((_, index) => index);

  return (
    <div className="calendar__day" data-day={dayID}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => moment(event.dateFrom).get('hour') === hour);
        return (
          <Hour
            key={dayID + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            day={day}
            setEvents={setEvents}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dayID: PropTypes.number.isRequired,
  day: PropTypes.instanceOf(moment).isRequired,
  dayEvents: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Day;
