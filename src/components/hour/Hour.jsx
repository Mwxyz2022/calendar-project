import React from 'react';
import moment from 'moment/moment.js';
import PropTypes from 'prop-types';

import RedLine from '../redLine/RedLine.jsx';
import Event from '../event/Event.jsx';

import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
  redlinePosition,
  dataHour,
  dataDay,
  hourEvents,
  fullDayDate,
  setEvents,
  setToggleModal,
  getSlotDate,
}) => {
  const showLine = dataDay === new Date().getDate() && dataHour === new Date().getHours();

  const openModal = () => {
    getSlotDate(fullDayDate, dataHour);
    setToggleModal(true);
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={openModal}>
      {showLine && <RedLine redlinePosition={redlinePosition} />}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${moment(dateFrom).get('hour')}:${formatMins(
          moment(dateFrom).get('minute'),
        )}`;
        const eventEnd = `${moment(dateTo).get('hour')}:${formatMins(
          moment(dateTo).get('minute'),
        )}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo - dateFrom) / (1000 * 60)}
            marginTop={moment(dateFrom).get('minute')}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            setEvents={setEvents}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  redlinePosition: PropTypes.string.isRequired,
  dataHour: PropTypes.number.isRequired,
  dataDay: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  fullDayDate: PropTypes.object.isRequired,
  setEvents: PropTypes.func.isRequired,
  setToggleModal: PropTypes.func.isRequired,
  getSlotDate: PropTypes.func.isRequired,
};

export default Hour;
