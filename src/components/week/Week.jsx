import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Day from '../day/Day.jsx';

const Week = ({ events, weekDates, setEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((day, dayID) => {
        const dayEnd = day.clone().add(24, 'hours');

        const dayEvents = events.filter(event => event.dateFrom >= day && event.dateTo <= dayEnd);

        return (
          <Day key={dayID} dayID={dayID} day={day} dayEvents={dayEvents} setEvents={setEvents} />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  events: PropTypes.array.isRequired,
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(moment)).isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Week;
