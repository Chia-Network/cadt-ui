interface userOptionsInitialState {
  selectedTheme: 'light' | 'dark';
  fallbackStoreProvider: string;
  accessKey: string;
  accessSecret: string;
  storeLabels: object;
  storeProjectFolders: object;
  deployOptions: {
    datalayerHost: string;
    walletHost: string;
    certificateFolderPath: string;
    defaultWalletId: number | null;
    defaultFee: string;
    defaultMirrorCoinAmount: number | null;
    maximumRpcPayloadSize: number | null;
    web2GatewayPort: number | null;
    web2GatewayHost: string;
    forceIp4Mirror: boolean;
    mirrorUrlOverride: string | null;
    verbose: boolean;
    numFilesProcessedPerBatch: number | null;
    ignoreOrphans: boolean;
  };
}

const initialState: userOptionsInitialState = {
  selectedTheme: 'light',
  fallbackStoreProvider: 'https://datalayer.link',
  accessKey: '',
  accessSecret: '',
  storeProjectFolders: {},
  storeLabels: {},
  deployOptions: {
    datalayerHost: 'https://localhost:8562',
    walletHost: 'https://localhost:9256',
    certificateFolderPath: '~/.chia/mainnet/config/ssl',
    defaultWalletId: 1,
    defaultFee: '300000000',
    defaultMirrorCoinAmount: 300000000,
    maximumRpcPayloadSize: 26214400,
    web2GatewayPort: 41410,
    web2GatewayHost: 'localhost',
    forceIp4Mirror: true,
    mirrorUrlOverride: null,
    verbose: false,
    numFilesProcessedPerBatch: 100,
    ignoreOrphans: false,
  },
};

export default initialState;
