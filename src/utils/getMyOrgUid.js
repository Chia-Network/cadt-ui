export const getMyOrgUid = organizations => {
  for (const property in organizations) {
    if (organizations[property].writeAccess) {
      return property;
    }
  }
  return 'none';
};
