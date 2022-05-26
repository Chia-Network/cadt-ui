export const areUiAndDataModelMajorVersionsAMatch = apiDataModelVersion => {
  const majorVersionGroup = /(\d+)/;

  const apiMajorVersion = apiDataModelVersion.match(majorVersionGroup)[0];
  const npmPackageVersion = process.env.REACT_APP_VERSION;

  const npmMajorVersion = npmPackageVersion.match(majorVersionGroup)[0];

  return npmMajorVersion === apiMajorVersion;
};
