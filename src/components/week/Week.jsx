import React, { useState, useEffect } from 'react';
import Day from '../day/Day';

import './week.scss';

const MINUTE = 60000;

const Week = ({ weekDates, events, setEvents }) => {
	const [redlinePosition, setRedlinePosition] = useState(
		`${new Date().getMinutes()}px`
	);

	console.log(redlinePosition);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setRedlinePosition(`${new Date().getMinutes()}px`);
		}, MINUTE);

		return () => clearInterval(intervalId);
	}, [redlinePosition]);

	return (
		<div className="calendar__week">
			{weekDates.map((dayStart) => {
				const dayEnd = new Date(dayStart.getTime()).setHours(
					dayStart.getHours() + 24
				);

				//getting all events from the day we will render
				const dayEvents = events.filter(
					(event) =>
						event.dateFrom > dayStart && event.dateTo < dayEnd
				);

				return (
					<Day
						key={dayStart.getDate()}
						dataDay={dayStart.getDate()}
						dayEvents={dayEvents}
						setEvents={setEvents}
						redlinePosition={redlinePosition}
					/>
				);
			})}
		</div>
	);
};

export default Week;
