import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { baseUrl, fetchEvent } from './gateway/events';

const App = () => {
	const [events, setEvents] = useState([]);
	const [weekStartDate, setStartWeek] = useState(new Date());
	const [showModal, setToggleModal] = useState(false);

	useEffect(() => {
		fetchEvent().then((response) => {
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
			/>
			{showModal && (
				<Modal setToggleModal={setToggleModal} setEvents={setEvents} />
			)}
		</>
	);
};

export default App;
