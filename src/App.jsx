import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

const App = () => {
	const [events, setEvents] = useState([
		{
			id: 1,
			title: 'Go to the gym',
			description: 'some text here',
			dateFrom: new Date(2023, 0, 24, 10, 15),
			dateTo: new Date(2023, 0, 24, 15, 0),
		},
		{
			id: 2,
			title: 'Go to the school',
			description: 'hello, 2 am',
			dateFrom: new Date(2023, 0, 25, 10, 15),
			dateTo: new Date(2023, 0, 25, 11, 0),
		},
		{
			id: 3,
			title: 'Lunch',
			description: '',
			dateFrom: new Date(2023, 0, 26, 10, 30),
			dateTo: new Date(2023, 0, 26, 11, 30),
		},
		{
			id: 4,
			title: 'Meet friend',
			description: 'at the cafe',
			dateFrom: new Date(2023, 0, 27, 10, 30),
			dateTo: new Date(2023, 0, 27, 11, 0),
		},
	]);
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
			<Calendar
				weekDates={weekDates}
				events={events}
				setEvents={setEvents}
			/>
			{showModal && (
				<Modal setToggleModal={setToggleModal} setEvents={setEvents} />
			)}
		</>
	);
};

export default App;
