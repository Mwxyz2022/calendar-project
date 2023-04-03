import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { fetchEvent, deleteEvent } from '../../gateway/events';
import { delValidation } from '../../utils/validation';

import './event.scss';

const Event = ({ id, title, startEventDate, time, height, marginTop, setEvents }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteModalHandler = event => {
    event.stopPropagation();
    setDeleteModal(!deleteModal);
  };

  const eventStyle = {
    height,
    marginTop,
  };

  const delModalStyle = {
    top: height - 10,
  };

  const deleteEventHandler = async event => {
    event.stopPropagation();

    const errorMessage = delValidation(startEventDate);

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      await deleteEvent(id);
      const response = await fetchEvent();
      setDeleteModal(false);
      setEvents(response);
    } catch (error) {
      console.error(error.message);
      alert('Error deleting the event!');
    }
  };

  return (
    <>
      <div style={eventStyle} className="event" onClick={deleteModalHandler}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {deleteModal && (
        <div className="delete" onClick={deleteEventHandler} style={delModalStyle}>
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
  startEventDate: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Event;
