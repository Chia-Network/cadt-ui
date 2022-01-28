export const getMyOrgUid = organizations => {
  for (const property in organizations) {
    if (organizations[property].isHome) {
      return property;
    }
  }
  return 'none';
};
