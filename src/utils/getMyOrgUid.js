export const getMyOrgUid = organizations => {
  if (organizations?.pending) {
    return 'PENDING';
  }

  for (const property in organizations) {
    if (organizations[property].isHome) {
      return property;
    }
  }

  return null;
};
