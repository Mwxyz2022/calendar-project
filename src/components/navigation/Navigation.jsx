import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import './navigation.scss';

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

        const dateName = dayDate.format('ddd');
        const dateNum = dayDate.date();

        return (
          <div className="calendar__day-label day-label" key={dateNum}>
            <span className="day-label__day-name">{dateName}</span>
            <span className={styleDay}>{dateNum}</span>
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
