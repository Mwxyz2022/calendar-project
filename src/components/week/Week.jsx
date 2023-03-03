import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Day from '../day/Day.jsx';

import './week.scss';

import { MINUTE } from '../../utils/variables.js';

const Week = ({ events, weekDates, setEvents }) => {
  const [redlinePosition, setRedlinePosition] = useState(`${new Date().getMinutes()}px`);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedlinePosition(`${new Date().getMinutes()}px`);
    }, MINUTE);

    return () => clearInterval(intervalId);
  }, [redlinePosition]);

  return (
    <div className="calendar__week">
      {weekDates.map((dayStart, weekDay) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        const dayEvents = events.filter(
          event => event.dateFrom >= dayStart && event.dateTo <= dayEnd,
        );

        const dataDay = dayStart.getDate();

        return (
          <Day
            key={dataDay}
            weekDay={weekDay}
            dataDay={dataDay}
            dayEvents={dayEvents}
            setEvents={setEvents}
            redlinePosition={redlinePosition}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  events: PropTypes.array.isRequired,
  weekDates: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Week;
