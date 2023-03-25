import React, { useState } from 'react';
import moment from 'moment';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { generateWeekRange } from './utils/utils';

const App = () => {
  const curWeekStartDay = moment().startOf('isoWeek');

  const [weekStartDate, setStartWeek] = useState(curWeekStartDay);
  const [showModal, setToggleModal] = useState(false);

  const weekDates = generateWeekRange(weekStartDate);

  return (
    <>
      <Header
        curWeekStartDay={curWeekStartDay}
        weekStartDate={weekStartDate}
        weekDates={weekDates}
        setStartWeek={setStartWeek}
        setToggleModal={setToggleModal}
      />
      <Calendar weekDates={weekDates} showModal={showModal} setToggleModal={setToggleModal} />
    </>
  );
};

export default App;
