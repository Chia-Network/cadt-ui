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
