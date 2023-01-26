import React from 'react';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
	return (
		<header className="calendar__header">
			{weekDates.map((dayDate) => (
				<div
					className="calendar__day-label day-label"
					key={dayDate.getDay()}
				>
					<span className="day-label__day-name">
						{days[dayDate.getDay()]}
					</span>
					<span className="day-label__day-number">
						{dayDate.getDate()}
					</span>
				</div>
			))}
			<div className="current_day"></div>
		</header>
	);
};

export default Navigation;
