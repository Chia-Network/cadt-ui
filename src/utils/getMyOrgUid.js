export const getMyOrgUid = organizations => {
  if (organizations?.PENDING) {
    return 'PENDING';
  }

  for (const property in organizations) {
    if (organizations[property].isHome) {
      return property;
    }
  }

  return null;
};
