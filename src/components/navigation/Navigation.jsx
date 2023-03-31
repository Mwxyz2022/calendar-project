import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map(dayDate => {
        const isToday = dayDate.isSame(moment(), 'day');
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
