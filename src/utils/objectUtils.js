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

  changes.forEach(object => (keys = [...keys, ...Object.keys(object)]));

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
      diffObject[uniqueKey] = getDiffObject(
        original[uniqueKey],
        ...changes.map(change => change[uniqueKey]),
      );
    }
    // handle key is primitive case
    else {
      diffObject[uniqueKey] = {};

      diffObject[uniqueKey].original =
        original && original[uniqueKey] ? original[uniqueKey] : null;

      diffObject[uniqueKey].changes = [];

      changes.forEach((change, index) => {
        if (
          change &&
          change[uniqueKey] &&
          change[uniqueKey] !== (original ? original[uniqueKey] : null)
        ) {
          diffObject[uniqueKey].changes[index] = change[uniqueKey];
        } else {
          diffObject[uniqueKey].changes[index] = null;
        }
      });
    }
  });

  return diffObject;
};

export const getDiffArray = (originalArray, ...changesArrays) => {
  let ids = originalArray.map(item => item.id);

  changesArrays.forEach(arrayItem =>
    arrayItem.forEach(key => ids.push(key.id)),
  );

  const uniqueIds = [...new window.Set(ids)].sort();

  const diffArray = [];

  uniqueIds.forEach(uniqueId => {
    const originalObj =
      originalArray.filter(item => item.id === uniqueId)[0] ?? null;

    const changesObjects = changesArrays.map(
      arrayItem => arrayItem.filter(key => key.id === uniqueId)[0] ?? null,
    );

    let diffObject = getDiffObject(originalObj, ...changesObjects);

    diffArray.push(diffObject);
  });

  return diffArray;
};
