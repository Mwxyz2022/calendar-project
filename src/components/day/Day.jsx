import React from 'react';
import moment from 'moment/moment.js';
import PropTypes from 'prop-types';

import Hour from '../hour/Hour.jsx';

import './day.scss';

const Day = ({ weekDay, dataDay, dayEvents, setEvents }) => {
  const hours = Array(24)
    .fill()
    .map((_, index) => index);

  return (
    <div className="calendar__day" data-day={weekDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => moment(event.dateFrom).get('hour') === hour);
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dataDay={dataDay}
            setEvents={setEvents}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  weekDay: PropTypes.number.isRequired,
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Day;
