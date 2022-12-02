import _ from 'lodash';

const hostName = String(_.get(window, 'location.hostname', ''));
const protocol = String(_.get(window, 'location.protocol', 'http'));

export default {
  // if running locally use localhost api, otherwise use observer node api
  API_HOST:
    _.isEmpty(hostName) || hostName.includes('localhost')
      ? 'http://localhost:31310/v1'
      : `${protocol}//${hostName}/api/v1`,
  APP_URL: _.isEmpty(hostName) || hostName.includes('localhost')
      ? 'https://app.climatewarehouse.chia.net/'
      : `${protocol}//${hostName}/`,
  MAX_TABLE_SIZE: 7,
  MAX_AUDIT_TABLE_SIZE: 20,
  HEADER_HEIGHT: 64, // Needed to be used to calculate max height for body components
  THEME: {
    DEFAULT: 'default',
  },
  ORG_LIST_JSON_EXAMPLE: `
  [
    {
      "orgUid": "3c1865c752a3a965a7ac7292d3cd3e7079ad406040785bcd614f63251e0a1fa4",
      "ip": "100.18.2.19",
      "port": 8000
    }
  ]`,
  PICK_LIST_JSON_EXAMPLE: `
  {
    "registries": [
        "Verra",
        "Gold Standard",
        "Climate Action Reserve (CAR)",
        "American Carbon Registry (ACR)",
        "Cultivo",
        "Switzerland National Registry",
        "Sweden National Registry",
        "Singapore National Registry",
        "Japan National Registry",
        "Costa Rica National Registry",
        "Mexico National Registry",
        "Chile National Registry",
        "UNFCCC",
        "Open Earth Foundation"
    ]
  }`,
};
