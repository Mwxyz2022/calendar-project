import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import Modal from '../modal/Modal.jsx';

import { fetchEvent } from '../../gateway/events.js';

import './calendar.scss';

const Calendar = ({ showModal, weekDates, setToggleModal }) => {
  const [events, setEvents] = useState([]);
  const [selectData, setSelectData] = useState({});

  const hourDateHandler = event => {
    setSelectData({
      hourSelect: parseInt(event.target.dataset.hour),
      dateSelect: weekDates[event.target.closest('.calendar__day').dataset.day],
    });
    setToggleModal(true);
  };

  useEffect(() => {
    setSelectData({});
  }, [showModal]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchEvent();
        setEvents(response);
      } catch (error) {
        console.error(error.message);
        alert('Error loading events data');
      }
    };

    fetchEvents();
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
        <Modal selectData={selectData} setToggleModal={setToggleModal} setEvents={setEvents} />
      )}
    </>
  );
};

Calendar.propTypes = {
  showModal: PropTypes.bool.isRequired,
  weekDates: PropTypes.array.isRequired,
  setToggleModal: PropTypes.func.isRequired,
};

export default memo(Calendar);
