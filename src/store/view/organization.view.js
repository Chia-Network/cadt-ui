export const getHomeOrg = store => {
  const { myOrgUid } = store.climateWarehouse;
  const isMyOrgPending = myOrgUid === 'PENDING';
  return [myOrgUid, isMyOrgPending];
};
