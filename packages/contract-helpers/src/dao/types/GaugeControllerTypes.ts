import { tEthereumAddress } from '../../commons/types';

export type VoteForGaugeWeightsParamsType = {
  user: tEthereumAddress;
  gaugeAddr: string;
  userWeight: number;
};
