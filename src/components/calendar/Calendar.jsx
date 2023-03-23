import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment.js';

import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import Modal from '../modal/Modal.jsx';

import { fetchEvent } from '../../gateway/events.js';
import { getFullTime } from '../../utils/timeUtils';
import { defaultEventTime } from '../../utils/dateUtils';

import './calendar.scss';

const Calendar = ({ showModal, weekDates, setToggleModal }) => {
  const [events, setEvents] = useState([]);
  const [modalDefaultDate, setModalDefaultDate] = useState(defaultEventTime);

  const hourDateHandler = event => {
    const time = parseInt(event.target.dataset.time);
    const dayDate = weekDates[event.target.closest('.calendar__day').dataset.day];

    setModalDefaultDate({
      defaultEventDate: moment(dayDate).format('YYYY-MM-DD'),
      defaultEventStartTime: getFullTime(time),
      defaultEventEndTime: getFullTime(time + 1),
    });
    setToggleModal(true);
  };

  useEffect(() => {
    setModalDefaultDate(defaultEventTime);
  }, [showModal]);

  useEffect(() => {
    fetchEvent().then(response => {
      setEvents(response);
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
        <Modal
          modalDefaultDate={modalDefaultDate}
          setToggleModal={setToggleModal}
          setEvents={setEvents}
        />
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
