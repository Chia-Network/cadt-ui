export const downloadTxtFile = async (type, search, orgUid) => {
  await fetch(
    `http://localhost:3030/v1/${type}?${
      search === null || search === '' ? '' : `search=${search}&`
    }orgUid=${orgUid}&xls=true`,
  )
    .then(result => result.blob())
    .then(blob => {
      const element = document.createElement('a');
      element.href = URL.createObjectURL(new Blob([blob]));
      element.download = 'cl.xlsx'
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    });
};
