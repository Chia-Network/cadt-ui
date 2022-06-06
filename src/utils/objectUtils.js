import _ from 'lodash';

export const getDiff = (a, b) => {
  return _.reduce(
    a,
    function (result, value, key) {
      return _.isEqual(value, b[key]) ? result : result.concat(key);
    },
    [],
  );
};

export const getDiffObject = (original, ...changes) => {
  let keys = original ? Object.keys(original) : [];
  changes.forEach(
    object => object != null && keys.push(...Object.keys(object)),
  );

  const uniqueKeys = [...new window.Set(keys)];

  const diffObject = {};

  uniqueKeys.forEach(uniqueKey => {
    // handle key is array case
    if (original && original[uniqueKey] && Array.isArray(original[uniqueKey])) {
      let hasChanges =
        changes?.some(
          change => change[uniqueKey] != null && change[uniqueKey].length > 0,
        ) ?? false;

      if (original[uniqueKey].length > 0 || hasChanges) {
        const originalArray = original[uniqueKey];

        const changesArray = changes.map(changeItem => changeItem[uniqueKey]);

        diffObject[uniqueKey] = getDiffArray(originalArray, ...changesArray);
      } else {
        diffObject[uniqueKey] = null;
      }
    }
    // handles key is obj but not null or array case
    else if (
      original &&
      original[uniqueKey] &&
      typeof original[uniqueKey] === 'object'
    ) {
      if (_.isObject(original[uniqueKey]) && uniqueKey === 'issuance') {
        diffObject[uniqueKey] = getDiffObject(
          original[uniqueKey],
          ...changes.map(change => change[uniqueKey]),
        );
      } else if (_.isEmpty(original[uniqueKey])) {
        diffObject[uniqueKey] = getDiffObject(
          original[uniqueKey],
          ...changes.map(change => change[uniqueKey]),
        );
        diffObject[uniqueKey] = getDiffObject(
          original[uniqueKey],
          ...changes.map(change => change[uniqueKey]),
        );
      }
    }
    // handle key is primitive case
    else {
      diffObject[uniqueKey] = {};

      diffObject[uniqueKey].original =
        original && original[uniqueKey] ? original[uniqueKey] : null;

      diffObject[uniqueKey].changes = [];
      // Creates Changes
      changes.forEach((change, index) => {
        if (
          change &&
          change[uniqueKey] &&
          change[uniqueKey] !== (original ? original[uniqueKey] : null)
        ) {
          diffObject[uniqueKey].changes[index] = change[uniqueKey];
        } else {
          if (uniqueKey === 'unitQuantity' && !diffObject[uniqueKey].original) {
            return (diffObject[uniqueKey].original = 0);
          } else if (
            uniqueKey === 'unitCount' &&
            !diffObject[uniqueKey].changes[0] &&
            !_.isEmpty(diffObject[uniqueKey].changes)
          ) {
            return (diffObject[uniqueKey].changes[index] = 0);
          }
          if (change) {
            if (change[uniqueKey] === (original && original[uniqueKey])) {
              return (diffObject[uniqueKey].changes[index] = '');
            }
          }
          //add null to changes
          diffObject[uniqueKey].changes[index] = null;
        }
      });
    }
  });

  return diffObject;
};

export const getDiffArray = (originalArray, ...changesArrays) => {
  let ids = originalArray.map(item => item.id);

  if (_.every(changesArrays, i => i)) {
    changesArrays.forEach(arrayItem =>
      arrayItem.forEach(key => ids.push(key.id)),
    );
  }

  const uniqueIds = [...new window.Set(ids)].sort();

  const diffArray = [];

  uniqueIds.forEach(uniqueId => {
    const originalObj = _.find(originalArray, item => item.id === uniqueId);
    const changesObjects = changesArrays.map(arrayItem =>
      _.find(arrayItem, key => key.id === uniqueId),
    );

    let diffObject = getDiffObject(originalObj, ...changesObjects);

    diffArray.push(diffObject);
  });
  return diffArray;
};
