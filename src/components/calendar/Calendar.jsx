import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import Modal from '../modal/Modal.jsx';

import { fetchEvent } from '../../gateway/events.js';

import { getDefModalDataDate } from '../../utils/utils';

import './calendar.scss';

const Calendar = ({ showModal, weekDates, setToggleModal }) => {
  const defDataDate = getDefModalDataDate(moment());

  const [events, setEvents] = useState([]);
  const [defModalDate, setDefModalDate] = useState(defDataDate);

  const hourDateHandler = event => {
    const selectHour = parseInt(event.target.dataset.hour);
    const selectDate = weekDates[event.target.closest('.calendar__day').dataset.day];

    const formatDefDate = selectDate.format('YYYY-MM-DD');
    const formatDefStartTime = selectDate.hour(selectHour).format('HH:mm');
    const formatDefEndTime =
      selectHour + 1 === 24 ? '23:59' : selectDate.hour(selectHour + 1).format('HH:mm');

    setDefModalDate({
      defDate: formatDefDate,
      defStartTime: formatDefStartTime,
      defEndTime: formatDefEndTime,
    });
    setToggleModal(true);
  };

  useEffect(() => {
    setDefModalDate(defDataDate);
  }, [showModal]);

  useEffect(() => {
    fetchEvent()
      .then(response => {
        setEvents(response);
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <>
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container" onClick={hourDateHandler}>
            <Sidebar />
            <Week events={events} weekDates={weekDates} setEvents={setEvents} />
          </div>
        </div>
      </section>
      {showModal && (
        <Modal defModalDate={defModalDate} setToggleModal={setToggleModal} setEvents={setEvents} />
      )}
    </>
  );
};

Calendar.propTypes = {
  showModal: PropTypes.bool.isRequired,
  weekDates: PropTypes.array.isRequired,
  setToggleModal: PropTypes.func.isRequired,
};

export default Calendar;
