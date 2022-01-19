const { Parser } = require('json2csv');

export const jsonToCsv = json => {
  const json2csvParser = new Parser();
  return json2csvParser.parse(json);
};

export const downloadTxtFile = data => {
  const element = document.createElement('a');
  const file = new Blob([jsonToCsv(data)], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'climateWarehouse.csv';
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};
