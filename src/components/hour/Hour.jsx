import React from 'react';
import RedLine from '../redLine/RedLine';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';
import moment from 'moment/moment.js';

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
				const eventStart = `${moment(dateFrom).get(
					'hour'
				)}:${formatMins(moment(dateFrom).get('minute'))}`;
				const eventEnd = `${moment(dateTo).get('hour')}:${formatMins(
					moment(dateTo).get('minute')
				)}`;

				return (
					<Event
						key={id}
						id={id}
						//calculating event height = duration of event in minutes
						height={(dateTo - dateFrom) / (1000 * 60)}
						marginTop={moment(dateFrom).get('minute')}
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
