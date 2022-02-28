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
  const expression =
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  return expression.test(url);
};


