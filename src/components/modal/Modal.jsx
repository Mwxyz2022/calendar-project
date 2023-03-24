import React, { useState } from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';

import { postEvent, fetchEvent } from '../../gateway/events.js';
import { eventValidation } from '../../utils/validation';

import './modal.scss';

const Modal = ({ defModalDate, setEvents, setToggleModal }) => {
  const { defDate, defStartTime, defEndTime } = defModalDate;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(defDate);
  const [startTime, setStartTime] = useState(defStartTime);
  const [endTime, setEndTime] = useState(defEndTime);
  const [description, setDescription] = useState('');

  const titleHandler = e => {
    setTitle(e.target.value);
  };

  const dateHandler = e => {
    setDate(e.target.value);
  };

  const startTimeHandler = e => {
    setStartTime(e.target.value);
  };

  const endTimeHandler = e => {
    setEndTime(e.target.value);
  };

  const descriptionHandler = e => {
    setDescription(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const payload = {
      title,
      description,
      dateFrom: moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm').valueOf(),
      dateTo: moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm').valueOf(),
    };

    // I'm getting all events because the POST API server doesn't support validation

    fetchEvent().then(events => {
      const errorMessage = eventValidation(payload, events);

      if (errorMessage) {
        alert(errorMessage);
        return;
      }

      postEvent(payload).then(() => {
        fetchEvent().then(response => {
          setEvents(response);
          setToggleModal(false);
        });
      });
    });
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeModal}>
            +
          </button>
          <form className="event-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="title"
              className="event-form__field"
              placeholder="Title"
              onChange={titleHandler}
              value={title}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={dateHandler}
                value={date}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={startTimeHandler}
                value={startTime}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={endTimeHandler}
                value={endTime}
                required
              />
            </div>
            <textarea
              name="description"
              className="event-form__field"
              placeholder="Description"
              onChange={descriptionHandler}
              value={description}
              required
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  defModalDate: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
  setToggleModal: PropTypes.func.isRequired,
};

export default Modal;
