import _ from 'lodash';

export const formatAPIData = unformattedData => {
  const result = {};
  const unformattedDataKeys = Object.keys(unformattedData);
  unformattedDataKeys.forEach(key => {
    // format arrays
    if (Array.isArray(unformattedData[key])) {
      // take out fields invalidated by the API
      let cleanArray =
        key === 'labels'
          ? unformattedData[key].map(item => _.omit(item, ['orgUid']))
          : unformattedData[key].map(item =>
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
    }

    // format null values
    else if (unformattedData[key] === null || unformattedData[key] === 'null') {
      result[key] = '';
    }

    // format objects
    else if (typeof unformattedData[key] === 'object') {
      let obj = _.cloneDeep(unformattedData[key]);
      const keysToBeRemoved = ['orgUid', 'warehouseProjectId'];
      keysToBeRemoved.forEach(invalidKey => {
        if (obj[invalidKey] || obj[invalidKey] === null) {
          delete obj[invalidKey];
        }
      });
      result[key] = obj;
    }

    // if none of the above and key name is valid for API requests
    else if (!['orgUid', 'issuanceId'].includes(key)) {
      result[key] = unformattedData[key];
    }

    // create array for tags
    if (
      (key === 'projectTags' || key === 'unitTags') &&
      !_.isArray(result[key])
    ) {
      result[key] = unformattedData[key]?.split(',');
    }
  });

  return result;
};

export const cleanObjectFromEmptyFieldsOrArrays = dataToSend => {
  Object.keys(dataToSend).forEach(el => {
    // clean empty fields
    if (!dataToSend[el]) {
      delete dataToSend[el];
    }

    // clean empty arrays
    if (dataToSend[el]?.length === 0) {
      delete dataToSend[el];
    }

    // join project tags array
    if (el === 'projectTags' || el === 'unitTags') {
      dataToSend[el] = dataToSend[el]?.join(',');
    }

    // clean empty strings within arrays
    // clean tempId used for Ui key iteration purpose
    if (Array.isArray(dataToSend[el])) {
      dataToSend[el].forEach(individualArrayItem =>
        Object.keys(individualArrayItem).forEach(key => {
          if (
            individualArrayItem[key] === '' ||
            individualArrayItem[key] === null ||
            key === 'tempId'
          ) {
            delete individualArrayItem[key];
          }
        }),
      );
    }
  });
};
