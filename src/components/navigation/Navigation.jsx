import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Navigation = ({ weekDates }) => {
  const [date, setDate] = useState(moment().startOf('day'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(moment().startOf('day'));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="calendar__header">
      {weekDates.map(dayDate => {
        const isToday = dayDate.isSame(date, 'day');
        const styleDay = isToday ? 'day-label__day-number today' : 'day-label__day-number';

        return (
          <div className="calendar__day-label day-label" key={dayDate.day()}>
            <span className="day-label__day-name">{dayDate.format('ddd')}</span>
            <span className={styleDay}>{dayDate.date()}</span>
          </div>
        );
      })}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(moment)).isRequired,
};

export default Navigation;
