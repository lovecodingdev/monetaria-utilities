import { SignatureLike } from '@ethersproject/bytes';
import { BytesLike } from 'ethers';
import {
  tEthereumAddress,
  InterestRate,
  PermitSignature,
} from '../commons/types';

export type WorkParamsType = {
  mToken: tEthereumAddress;
  worker: tEthereumAddress;
  principalAmount: string;
  borrowAmount: string;
  maxReturn: string;
  strategy: tEthereumAddress;
};
