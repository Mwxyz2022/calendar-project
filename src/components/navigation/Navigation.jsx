import React, { useState, useEffect } from 'react';

import { days } from '../../utils/dateUtils.js';

const MINUTE = 60000;

const Navigation = ({ weekDates }) => {
	const [date, setDate] = useState(new Date().setHours(0, 0, 0, 0));
	useEffect(() => {
		const intervalId = setInterval(() => {
			setDate(new Date().setHours(0, 0, 0, 0));
		}, MINUTE);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<header className="calendar__header">
			{weekDates.map((dayDate) => {
				const styleDay =
					date !== dayDate.getTime()
						? `day-label__day-number`
						: `day-label__day-number today `;

				return (
					<div
						className="calendar__day-label day-label  "
						key={dayDate.getDay()}
					>
						<span className="day-label__day-name">
							{days[dayDate.getDay()]}
						</span>

						<span className={styleDay}>{dayDate.getDate()}</span>
					</div>
				);
			})}
		</header>
	);
};

export default Navigation;
