import gateway from 'chia-web2-gateway';

export const startWeb2Gateway = () => {
  // set from user settings
  gateway.configure({
    FULL_NODE_HOST: 'https://localhost:8555',
    DATALAYER_HOST: 'https://localhost:8562',
    WALLET_HOST: 'https://localhost:9256',
    CERTIFICATE_FOLDER_PATH: '~/.chia/mainnet/config/ssl',
    WEB2_GATEWAY_PORT: 41411,
    WEB2_BIND_ADDRESS: 'localhost',
    DEFAULT_WALLET_ID: 1,
    MAXIMUM_RPC_PAYLOAD_SIZE: 26214400,
  });
  gateway.start();
};