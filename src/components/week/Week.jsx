import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Day from '../day/Day.jsx';

import './week.scss';

import { MINUTE } from '../../utils/variables.js';

const Week = ({ events, weekDates, setEvents, setToggleModal, getSlotDate }) => {
  const [redlinePosition, setRedlinePosition] = useState(`${new Date().getMinutes()}px`);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedlinePosition(`${new Date().getMinutes()}px`);
    }, MINUTE);

    return () => clearInterval(intervalId);
  }, [redlinePosition]);

  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        const dayEvents = events.filter(
          event => event.dateFrom >= dayStart && event.dateTo <= dayEnd,
        );

        return (
          <Day
            key={dayStart.getDate()}
            fullDayDate={dayStart}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            setEvents={setEvents}
            redlinePosition={redlinePosition}
            setToggleModal={setToggleModal}
            getSlotDate={getSlotDate}
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
  setToggleModal: PropTypes.func.isRequired,
  getSlotDate: PropTypes.func.isRequired,
};

export default Week;
