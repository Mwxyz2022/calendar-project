import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchEvent, deleteEvent } from '../../gateway/events';

import './event.scss';

const Event = ({ id, title, time, height, marginTop, setEvents }) => {
	const [modal, setToggleModal] = useState(false);

	const openModal = () => {
		setToggleModal(!modal);
	};

	const eventStyle = {
		height,
		marginTop,
	};

	const delBtnPosition = height - 10;

	const deleteEventHandler = () => {
		deleteEvent(id).then(() => {
			fetchEvent().then((response) => {
				setEvents(response);
			});
			setToggleModal(false);
		});
	};

	return (
		<>
			<div style={eventStyle} className="event" onClick={openModal}>
				<div className="event__title">{title}</div>
				<div className="event__time">{time}</div>
			</div>
			{modal && (
				<div
					className="delete"
					onClick={deleteEventHandler}
					style={{ top: delBtnPosition }}
				>
					<i className="delete__icon fas fa-solid fa-trash"></i>
					<span className="delete__title">Delete</span>
				</div>
			)}
		</>
	);
};

Event.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	height: PropTypes.number.isRequired,
	marginTop: PropTypes.number.isRequired,
	setEvents: PropTypes.func.isRequired,
};

export default Event;
