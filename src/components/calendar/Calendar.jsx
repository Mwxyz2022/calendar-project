import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment.js';

import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import Modal from '../modal/Modal.jsx';

import { fetchEvent } from '../../gateway/events.js';
import { getFullTime } from '../../utils/timeUtils';

import './calendar.scss';

const Calendar = ({ showModal, weekDates, setToggleModal }) => {
  const [events, setEvents] = useState([]);
  const [hourData, setHourData] = useState(null);

  const onEventHandler = event => {
    const time = parseInt(event.target.dataset.time);
    const dayDate = weekDates[event.target.closest('.calendar__day').dataset.day]; //
    //event.target.parentNode.getAttribute('data-day')

    setHourData({
      eventDate: moment(dayDate).format('YYYY-MM-DD'),
      eventStartTime: getFullTime(time),
      eventEndTime: getFullTime(time + 1),
    });
    setToggleModal(true);
  };

  useEffect(() => {
    fetchEvent().then(response => {
      setEvents(response);
    });
  }, []);

  return (
    <>
      <section className="calendar" onClick={onEventHandler}>
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week events={events} weekDates={weekDates} setEvents={setEvents} />
          </div>
        </div>
      </section>
      {showModal && (
        <Modal
          hourData={hourData}
          setToggleModal={setToggleModal}
          setEvents={setEvents}
          setHourData={setHourData}
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
