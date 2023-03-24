import moment from 'moment/moment';

import { getDefStartTime, getDefEndTime } from './timeUtils';

const currentMoment = moment();

export const defEventTimeData = {
  defDate: moment().format('YYYY-MM-DD'),
  defStartTime: getDefStartTime(currentMoment),
  defEndTime: getDefEndTime(getDefStartTime(currentMoment)),
};

export const generateWeekRange = startDate => {
  return new Array(7).fill(null).map((_, index) => {
    return moment(startDate).add(index, 'days').startOf('day'); // to moments
  });
};
