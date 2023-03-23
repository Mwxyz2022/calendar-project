import React, { useState } from 'react';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './assets/common.scss';

const App = () => {
  const [weekStartDate, setStartWeek] = useState(new Date());
  const [showModal, setToggleModal] = useState(false);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header
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

// import React, { useState } from 'react';

// import Header from './components/header/Header.jsx';
// import Calendar from './components/calendar/Calendar.jsx';

// import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

// import './assets/common.scss';

// const App = () => {
//   const [weekStartDate, setStartWeek] = useState(new Date());
//   const [showModal, setToggleModal] = useState(false);

//   const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

//   return (
//     <>
//       <Header
//         weekStartDate={weekStartDate}
//         weekDates={weekDates}
//         setStartWeek={setStartWeek}
//         setToggleModal={setToggleModal}
//       />
//       <Calendar weekDates={weekDates} showModal={showModal} setToggleModal={setToggleModal} />
//     </>
//   );
// };

// export default App;
