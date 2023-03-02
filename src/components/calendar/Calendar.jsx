import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';

import './calendar.scss';

const Calendar = ({ events, weekDates, setEvents, setToggleModal, getSlotDate }) => {
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            events={events}
            weekDates={weekDates}
            setEvents={setEvents}
            setToggleModal={setToggleModal}
            getSlotDate={getSlotDate}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  weekDates: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
  setToggleModal: PropTypes.func.isRequired,
  getSlotDate: PropTypes.func.isRequired,
};

export default Calendar;
