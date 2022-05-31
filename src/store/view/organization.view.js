export const getHomeOrg = store => {
  const { myOrgUid } = store.climateWarehouse;
  const isMyOrgPending = myOrgUid === 'pending';
  return [myOrgUid, isMyOrgPending];
};
