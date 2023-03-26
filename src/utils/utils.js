import moment from 'moment';

export const generateWeekRange = startDate => {
  return new Array(7).fill(null).map((_, index) => {
    return moment(startDate).add(index, 'days').startOf('day');
  });
};

const formatTime = time => (time < 10 ? `0${time}` : time);

const getStartTime = date => {
  const hour = date.get('hour');
  const currentMins = date.get('minutes');

  if ((hour === 23 && currentMins > 45) || (hour === 0 && currentMins === 0)) {
    return '00:00';
  }

  const startHour = currentMins > 45 ? formatTime(hour + 1) : formatTime(hour);
  const startMins = currentMins > 45 ? 0 : Math.ceil(currentMins / 15) * 15;

  return `${startHour}:${formatTime(startMins)}`;
};

const getEndTime = startTime => {
  let [hour, mins] = startTime.split(':');
  hour = parseInt(hour);

  if (hour === 0) return `01:${mins}`;
  if (hour === 23 && mins > 0) return '23:59';

  return `${formatTime(hour + 1)}:${mins}`;
};

export const getDefModalDataDate = nowDate => {
  const formatDefDate = nowDate.format('YYYY-MM-DD');
  const formatDefStartTime = getStartTime(nowDate);
  const formatDefEndTime = getEndTime(formatDefStartTime);

  return {
    defDate: formatDefDate,
    defStartTime: formatDefStartTime,
    defEndTime: formatDefEndTime,
  };
};
