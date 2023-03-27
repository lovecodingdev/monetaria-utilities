import { tEthereumAddress } from '../../commons/types';

export type DepositParamsType = {
  user: tEthereumAddress;
  amount: string;
};

export type WithdrawParamsType = {
  user: tEthereumAddress;
  amount: string;
  claimRewards: boolean;
};
