import React from 'react';
import './modal.scss';
import events from '../../gateway/events';

const MAXEVENTTIME = 21600000;

const Modal = ({ setToggleModal, setEvents }) => {
	const closeModal = () => {
		setToggleModal(false);
	};

	const createEvent = (e) => {
		e.preventDefault();

		const startEventDate = new Date(
			`${e.target.date.value} ${e.target.startTime.value}`
		);

		const endEventDate = new Date(
			`${e.target.date.value} ${e.target.endTime.value}`
		);

		const newEvent = {
			id: Math.random(),
			title: e.target.title.value,
			description: e.target.description.value,
			dateFrom: startEventDate,
			dateTo: endEventDate,
		};

		if (newEvent.dateFrom.getTime() === newEvent.dateTo.getTime()) {
			return alert(
				'error: Минимальная длительность события должно быть не мене 15мин!'
			);
		}

		if (newEvent.dateFrom > newEvent.dateTo) {
			return alert('error: Начальная дата не может быть позже конечной!');
		}

		if (newEvent.dateTo - newEvent.dateFrom > MAXEVENTTIME) {
			return alert('error: Событие не может быть дольше 6-ти часов!');
		}

		const intersect = events
			.map(
				(event) =>
					(newEvent.dateFrom < event.dateFrom &&
						newEvent.dateTo <= event.dateFrom) ||
					(newEvent.dateFrom >= event.dateTo &&
						newEvent.dateTo > event.dateTo)
			)
			.every((el) => el === true);

		if (!intersect) {
			return alert(
				'error: У Вас на это время запланировано другое событие!'
			);
		}

		setEvents((prevValue) => [...prevValue, newEvent]);

		setToggleModal(false);
	};
	return (
		<div className="modal overlay">
			<div className="modal__content">
				<div className="create-event">
					<button
						className="create-event__close-btn"
						onClick={closeModal}
					>
						+
					</button>
					<form className="event-form" onSubmit={createEvent}>
						<input
							type="text"
							name="title"
							placeholder="Title"
							className="event-form__field"
							required
						/>
						<div className="event-form__time">
							<input
								type="date"
								name="date"
								className="event-form__field"
								required
							/>
							<input
								type="time"
								name="startTime"
								className="event-form__field"
								step="900"
								required
							/>
							<span>-</span>
							<input
								type="time"
								name="endTime"
								className="event-form__field"
								step="900"
								required
							/>
						</div>
						<textarea
							name="description"
							placeholder="Description"
							className="event-form__field"
							required
						></textarea>
						<button
							type="submit"
							className="event-form__submit-btn"
						>
							Create
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Modal;
