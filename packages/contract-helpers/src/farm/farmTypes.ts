import { tEthereumAddress } from '../commons/types';

export type WorkParamsType = {
  user: tEthereumAddress;
  mTokenAddress: tEthereumAddress;
  workerAddress: tEthereumAddress;
  strategyAddress: tEthereumAddress;
  borrowAmount: string;
  farmingAmount: string;
};
