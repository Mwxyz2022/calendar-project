import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { postEvent, fetchEvent } from '../../gateway/events.js';
import { eventValidation } from '../../utils/validation';

import './modal.scss';

const Modal = ({ defModalDate, setEvents, setToggleModal }) => {
  const { defDate, defStartTime, defEndTime } = defModalDate;

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: defDate,
    startTime: defStartTime,
    endTime: defEndTime,
    description: '',
  });

  const onChangeForm = event => {
    const { name, value } = event.target;

    setNewEvent(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();

    const payload = {
      title: newEvent.title,
      description: newEvent.description,
      dateFrom: moment(`${newEvent.date} ${newEvent.startTime}`, 'YYYY-MM-DD HH:mm').valueOf(),
      dateTo: moment(`${newEvent.date} ${newEvent.endTime}`, 'YYYY-MM-DD HH:mm').valueOf(),
    };

    // I'm getting all events because the POST API server doesn't support validation

    fetchEvent().then(events => {
      const errorMessage = eventValidation(payload, events);

      if (errorMessage) {
        alert(errorMessage);
        return;
      }

      postEvent(payload).then(() => {
        fetchEvent()
          .then(response => {
            setEvents(response);
            setToggleModal(false);
          })
          .catch(error => {
            throw new Error(error.message);
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
              onChange={onChangeForm}
              value={newEvent.title}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={onChangeForm}
                value={newEvent.date}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={onChangeForm}
                value={newEvent.startTime}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={onChangeForm}
                value={newEvent.endTime}
                required
              />
            </div>
            <textarea
              name="description"
              className="event-form__field"
              placeholder="Description"
              onChange={onChangeForm}
              value={newEvent.description}
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

//   const [title, setTitle] = useState('');
//   const [date, setDate] = useState(defDate);
//   const [startTime, setStartTime] = useState(defStartTime);
//   const [endTime, setEndTime] = useState(defEndTime);
//   const [description, setDescription] = useState('');

//   const titleHandler = e => {
//     setTitle(e.target.value);
//   };

//   const dateHandler = e => {
//     setDate(e.target.value);
//   };

//   const startTimeHandler = e => {
//     setStartTime(e.target.value);
//   };

//   const endTimeHandler = e => {
//     setEndTime(e.target.value);
//   };

//   const descriptionHandler = e => {
//     setDescription(e.target.value);
//   };
