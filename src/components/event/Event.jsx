import React, { useState } from 'react';
import { fetchEvent, deleteEvent } from '../../gateway/events';

import './event.scss';

const Event = ({ height, marginTop, title, time, setEvents, id }) => {
	const [modal, setModal] = useState(false);

	const openModal = () => {
		setModal(!modal);
	};

	const eventStyle = {
		height,
		marginTop,
	};

	const deleteHandler = () => {
		deleteEvent(id).then(() => {
			fetchEvent().then((response) => {
				setEvents(response);
			});
		});
	};

	return (
		<>
			<div style={eventStyle} className="event" onClick={openModal}>
				<div className="event__title">{title}</div>
				<div className="event__time">{time}</div>
				{modal ? (
					<div className="delete" onClick={deleteHandler}>
						<i className="delete__icon fas fa-solid fa-trash"></i>
						<span className="delete__title">Delete</span>
					</div>
				) : null}
			</div>
		</>
	);
};

export default Event;
