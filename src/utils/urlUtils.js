export const getUpdatedUrl = (currentUrlQuery, ...newParamsAndValues) => {
  let searchParams = new URLSearchParams(currentUrlQuery);
  newParamsAndValues.forEach(element => {
    if (element.value) {
      searchParams.set(element.param, element.value);
    } else {
      searchParams.delete(element.param);
    }
  });
  return searchParams.toString();
};

export const validateUrl = url => {
  const expression = /^(http|https):\/\/[^ "]+$/;
  return expression.test(url);
};

export const overrideURL = originalUrl => {
  const serverAddress = localStorage.getItem('serverAddress');

  // If serverAddress is valid, replace the domain of the original URL.
  if (serverAddress && typeof serverAddress === 'string') {
    const serverUrl = new URL(serverAddress);
    originalUrl = new URL(originalUrl);

    // Remove trailing slash from serverUrl.pathname if it exists
    let serverPathname = serverUrl.pathname;
    serverPathname = serverPathname.replace(/\/$/, '');

    // Replace the domain of the original URL with the server URL domain.
    // Also, append the server URL's pathname to the original URL's pathname.
    // And, maintain the query parameters from the original URL.
    const newUrl = new URL(
      serverPathname + originalUrl.pathname + originalUrl.search,
      serverUrl,
    );

    return newUrl.toString();
  }

  // If serverAddress is not valid, return the original URL.
  return originalUrl;
};
