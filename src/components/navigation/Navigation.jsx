import React from 'react';

import { days } from '../../utils/dateUtils.js';

const TODAY = new Date().setHours(0, 0, 0, 0);

const Navigation = ({ weekDates }) => {
	console.log(TODAY);
	return (
		<header className="calendar__header">
			{weekDates.map((dayDate) => {
				console.log(dayDate.getTime());
				const styleDay =
					TODAY !== dayDate.getTime()
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
