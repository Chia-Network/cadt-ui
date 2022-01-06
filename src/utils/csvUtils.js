const { Parser } = require('json2csv');

export const jsonToCsv = json => {
  const json2csvParser = new Parser();
  return json2csvParser.parse(json);
};
