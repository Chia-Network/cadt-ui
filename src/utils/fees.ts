import Wallet, {SendTransactionRequest} from "chia-wallet";

const mojosPerXch = 1e12;
export const fixedFeeXch = 0.01;
const feePer100MbXch = 0.01;
const walletAddress: string = 'xch1djjwc54ax3gz4n5fthkt5q4nhgerlx8e5n92435gr3scdsxrcf6sh55z5w';

export const sendFixedFee = (network: string, numSpendableCoins: number, blockChainFee: number) => {
  const wallet = new Wallet({verbose: true});

  // if the user has 2 spendable coins, send the usage fee
  if (network === 'mainnet' && numSpendableCoins >= 2){
    const request: SendTransactionRequest = {
      wallet_id: 1,
      address: walletAddress,
      amount: xchToMojos(fixedFeeXch),
      fee: blockChainFee
    };
    return wallet.sendTransaction(request);
  }
};

export const sendVariableFee = (network: string, numSpendableCoins: number, fee: number, blockChainFee: number) => {
  const wallet = new Wallet({verbose: true});

  // if the user has 2 spendable coins, send the usage fee
  if (network === 'mainnet' && numSpendableCoins >= 2){
    const request: SendTransactionRequest = {
      wallet_id: 1,
      address: walletAddress,
      amount: xchToMojos(fee),
      fee: blockChainFee
    };
    wallet.sendTransaction(request);
  }
};

export const calcSizeBasedDeployFee = (sizeMb: number): number => {
  const fee: number = parseFloat( ( (sizeMb / 100) * feePer100MbXch ).toFixed(5) );

  if (fee < fixedFeeXch){ // check: fee is less than a mojo
    return fixedFeeXch;
  } else {
    return fee;
  }
}

export const xchToMojos = (xch: number):number => {
  return Math.ceil(xch * mojosPerXch);
}