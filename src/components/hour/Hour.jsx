import React from 'react';
import RedLine from '../redLine/RedLine';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
	dataHour,
	hourEvents,
	setEvents,
	dataDay,
	redlinePosition,
}) => {
	const showLine =
		dataDay === new Date().getDate() && dataHour === new Date().getHours();

	return (
		<div className="calendar__time-slot" data-time={dataHour + 1}>
			{showLine && <RedLine redlinePosition={redlinePosition} />}

			{hourEvents.map(({ id, dateFrom, dateTo, title }) => {
				const eventStart = `${dateFrom.getHours()}:${formatMins(
					dateFrom.getMinutes()
				)}`;
				const eventEnd = `${dateTo.getHours()}:${formatMins(
					dateTo.getMinutes()
				)}`;

				return (
					<Event
						key={id}
						id={id}
						//calculating event height = duration of event in minutes
						height={
							(dateTo.getTime() - dateFrom.getTime()) /
							(1000 * 60)
						}
						marginTop={dateFrom.getMinutes()}
						time={`${eventStart} - ${eventEnd}`}
						title={title}
						setEvents={setEvents}
					/>
				);
			})}
		</div>
	);
};

export default Hour;
