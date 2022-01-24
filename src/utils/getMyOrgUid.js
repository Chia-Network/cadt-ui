export const getMyOrgUid = organizations => {
  for (const property in organizations) {
    if (organizations[property].writeAccess) {
      return property;
    }
  }
  return 'none';
};

export const getMyOrgUnits = (myOrgUid, units) => {
  const ownedUnits = units.filter(unit => unit.orgUid === myOrgUid);
  const ownedUnitsWarehouseIds = ownedUnits.map(unit => unit.warehouseUnitId);
  return ownedUnitsWarehouseIds;
};
