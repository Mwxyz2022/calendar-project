import React from 'react';
import moment from 'moment/moment.js';
import PropTypes from 'prop-types';

import Hour from '../hour/Hour.jsx';

import './day.scss';

const Day = ({
  redlinePosition,
  dataDay,
  fullDayDate,
  dayEvents,
  setEvents,
  setToggleModal,
  getSlotDate,
}) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => moment(event.dateFrom).get('hour') === hour);
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            redlinePosition={redlinePosition}
            dataDay={dataDay}
            fullDayDate={fullDayDate}
            setEvents={setEvents}
            setToggleModal={setToggleModal}
            getSlotDate={getSlotDate}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  redlinePosition: PropTypes.string.isRequired,
  dataDay: PropTypes.number.isRequired,
  fullDayDate: PropTypes.object.isRequired,
  dayEvents: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
  setToggleModal: PropTypes.func.isRequired,
  getSlotDate: PropTypes.func.isRequired,
};

export default Day;
