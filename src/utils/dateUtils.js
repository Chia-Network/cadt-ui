import dayjs from 'dayjs';

export const getIsDateValid = date => !isNaN(Date.parse(date));

// function is applied to onChange newValue received from MUI DateSelect so it's compatible with what the API expects
export const formatDate = date =>
  dayjs(date, 'YYYY/MM/DD').format('YYYY-MM-DDT00:00:00[Z]');

// function is applied to the dates the ui receives from the api
export const getISODate = date => {
  return getIsDateValid(date)
    ? dayjs(new Date(date)).format('YYYY/MM/DD')
    : date;
};
