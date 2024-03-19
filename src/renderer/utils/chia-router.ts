function extractSegment(url) {
  console.log('extractSegment', url);
  // Adjusted regex to make trailing slash optional and handle potential extra slashes
  const regex = /chia:\/\/([^\/]+)[\/]?/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const transformToHttpProtocal = (
  url: string,
  fallbackStoreProvider: string,
  ownedStores: any,
): string => {
  const storeId = extractSegment(url);
  const isOwned = ownedStores?.store_ids?.includes(storeId);
  const httpPrefix = isOwned
    ? 'http://localhost:41411/'
    : `${fallbackStoreProvider}/`;

  return url.replace('chia://', httpPrefix);
};

export const transformToChiaProtocol = (
  url: string,
  fallbackStoreProvider: string,
) => {
  if (url.includes('http://localhost:41411/')) {
    return url.replace('http://localhost:41411/', 'chia://');
  }

  return url.replace(`${fallbackStoreProvider}/`, 'chia://');
};
