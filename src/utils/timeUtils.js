export const formatTime = time => {
  return time < 10 ? `0${time}` : time;
};

export const getFullTime = hour => {
  if (hour === 24) return '23:59';

  return hour < 10 ? `0${hour}:00` : `${hour}:00`;
};

export const getDefStartTime = date => {
  const hour = date.get('hour');
  const currentMins = date.get('minutes');

  if ((hour === 23 && currentMins > 45) || (hour === 0 && currentMins === 0)) {
    return '00:00';
  }

  const nextHour = currentMins > 45 ? formatTime(hour + 1) : formatTime(hour);

  if (currentMins > 0 && currentMins <= 15) return `${nextHour}:15`;
  if (currentMins > 15 && currentMins <= 30) return `${nextHour}:30`;
  if (currentMins > 30 && currentMins <= 45) return `${nextHour}:45`;
  if (currentMins > 45) return `${nextHour}:00`;

  return `${nextHour}:00`;
};

export const getDefEndTime = date => {
  let [hour, mins] = date.split(':');
  hour = parseInt(hour);

  if (hour === 0 && mins >= 0) {
    return `01:${mins}`;
  }

  if (hour === 23 && mins > 0) {
    return '23:59';
  }

  return `${formatTime(hour + 1)}:${mins}`;
};
