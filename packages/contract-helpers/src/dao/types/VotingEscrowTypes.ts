import { tEthereumAddress } from '../../commons/types';

export type CreateLockParamsType = {
  user: tEthereumAddress;
  amount: string;
  unlockTime: number; // in milliseconds
};

export type IncreaseAmountParamsType = {
  user: tEthereumAddress;
  amount: string;
};

export type IncreaseUnlockTimeParamsType = {
  user: tEthereumAddress;
  unlockTime: number; // in milliseconds
};

export type WithdrawParamsType = {
  user: tEthereumAddress;
};
