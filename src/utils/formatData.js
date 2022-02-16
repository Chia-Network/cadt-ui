import _ from 'lodash';
import dayjs from 'dayjs';

export const formatDate = date =>
  dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

export const formatAPIData = unformattedData => {
  const result = {};
  const unformattedDataKeys = Object.keys(unformattedData);
  unformattedDataKeys.forEach(key => {
    if (Array.isArray(unformattedData[key])) {
      // take out fields invalidated by the API
      let cleanArray = unformattedData[key].map(item =>
        _.omit(item, ['warehouseProjectId', 'orgUid']),
      );

      // reformat fields data type
      cleanArray = cleanArray.map(subObject => {
        const transformedToString = [
          'ratingRangeHighest',
          'ratingRangeLowest',
          'rating',
        ];
        transformedToString.forEach(item => {
          if (subObject[item]) {
            subObject[item] = subObject[item].toString();
          }
        });
        return subObject;
      });

      result[key] = cleanArray;
    } else if (
      unformattedData[key] === null ||
      unformattedData[key] === 'null'
    ) {
      result[key] = '';
    } else if (key !== 'orgUid') {
      result[key] = unformattedData[key];
    }
  });

  return result;
};

export const cleanObjectFromEmptyFieldsOrArrays = dataToSend => {
  Object.keys(dataToSend).forEach(el => {
    if (!dataToSend[el]) {
      delete dataToSend[el];
    }
    if (typeof dataToSend[el] === 'object' && dataToSend[el].length === 0) {
      delete dataToSend[el];
    }
  });
};
