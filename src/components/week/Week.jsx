import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Day from '../day/Day.jsx';

import './week.scss';

const Week = ({ events, weekDates, setEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart, weekDay) => {
        const dayEnd = dayStart.clone().add(24, 'hours');

        const dayEvents = events.filter(
          event => event.dateFrom >= dayStart && event.dateTo <= dayEnd,
        );

        const dataDay = dayStart.date();

        return (
          <Day
            key={dataDay}
            weekDay={weekDay}
            dataDay={dataDay}
            dayEvents={dayEvents}
            setEvents={setEvents}
          />
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
