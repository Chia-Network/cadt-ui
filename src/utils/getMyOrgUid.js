export const getMyOrgUid = organizations => {
  if (organizations?.pending) {
    return 'pending';
  }

  for (const property in organizations) {
    if (organizations[property].isHome) {
      return property;
    }
  }

  return null;
};
