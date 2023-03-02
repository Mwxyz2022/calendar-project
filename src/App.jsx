import React, { useEffect, useState } from 'react';
import moment from 'moment/moment.js';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { fetchEvent } from './gateway/events.js';

import './common.scss';

const App = () => {
  const [events, setEvents] = useState([]);
  const [weekStartDate, setStartWeek] = useState(new Date());
  const [showModal, setToggleModal] = useState(false);
  const [defSlotDate, setDefSlotDate] = useState(null);

  const formatSlotTime = hourSlotKey => {
    if (hourSlotKey === 24) return '23:59';

    return hourSlotKey < 10 ? `0${hourSlotKey}:00` : `${hourSlotKey}:00`;
  };

  const getSlotDate = (slotDate, hourKey) => {
    setDefSlotDate({
      eventDate: moment(slotDate).format('YYYY-MM-DD'),
      eventStartTime: formatSlotTime(hourKey),
      eventEndTime: formatSlotTime(hourKey + 1),
    });
  };

  useEffect(() => {
    fetchEvent().then(response => {
      setEvents(response);
    });
  }, []);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        weekDates={weekDates}
        setStartWeek={setStartWeek}
        setToggleModal={setToggleModal}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        setEvents={setEvents}
        setToggleModal={setToggleModal}
        getSlotDate={getSlotDate}
      />
      {showModal && (
        <Modal
          events={events}
          defSlotDate={defSlotDate}
          setToggleModal={setToggleModal}
          setEvents={setEvents}
          setDefSlotDate={setDefSlotDate}
        />
      )}
    </>
  );
};

export default App;
