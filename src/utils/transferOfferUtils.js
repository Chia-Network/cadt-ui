const getTakerElementWithId = (takerItems, id) => {
  return takerItems.find(
    item => item?.warehouseUnitId === id || item?.warehouseProjectId === id,
  );
};

const buildChangeGroupFromMakerAndTakerItems = (maker, taker) => {
  const newChangeGroup = {
    action: 'UPDATE',
    isTransfer: true,
    isTaker: true,
    table: maker.table === 'project' ? 'Projects' : 'Units',
    diff: {
      original: maker.value,
      change: [taker.value],
    },
  };

  return newChangeGroup;
};

export const convertProcessedOfferToStagingChangeGroups = processedOffer => {
  const makerItems = processedOffer.changes.maker;
  const takerItems = processedOffer.changes.taker;

  const pendingChangeGroupsArray = makerItems.map(makerItem => {
    const takerCorrespondingItem = getTakerElementWithId(
      takerItems,
      makerItem?.warehouseUnitId || makerItem?.warehouseProjectId,
    );

    const changeGroupItem = buildChangeGroupFromMakerAndTakerItems(
      makerItem,
      takerCorrespondingItem,
    );

    return changeGroupItem;
  });

  return pendingChangeGroupsArray;
};

export const addIsMakerPropToChangeGroups = changeGroups => {
  return changeGroups.map(item => ({ ...item, isMaker: true }));
};
