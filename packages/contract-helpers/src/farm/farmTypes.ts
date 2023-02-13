import { SignatureLike } from '@ethersproject/bytes';
import { BytesLike } from 'ethers';
import {
  tEthereumAddress,
  InterestRate,
  PermitSignature,
} from '../commons/types';

export type WorkParamsType = {
  user: tEthereumAddress;
  mTokenAddress: tEthereumAddress;
  workerAddress: tEthereumAddress;
  strategyAddress: tEthereumAddress;
  borrowAmount: string;
  farmingAmount: string;
};
