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

export const validateIp = ip => {
  const expression = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(.|$)){4}\b/;
  return expression.test(ip);
};

export const validatePort = port => {
  const expression =
    /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
  return expression.test(port);
};
