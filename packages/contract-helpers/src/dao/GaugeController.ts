import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  ProtocolAction,
  tEthereumAddress,
  transactionType,
} from '../commons/types';
import { isEthAddress } from '../commons/validators/paramValidators';
import { ERC20Service, IERC20ServiceInterface } from '../erc20-contract';
import { WETHGatewayInterface } from '../wethgateway-contract';
import { VoteForGaugeWeightsParamsType } from './types/GaugeControllerTypes';
import { GaugeController as IGaugeController } from './typechain/GaugeController';
import { GaugeController__factory as IGaugeController__factory } from './typechain/GaugeController__factory';
import { BigNumber } from 'bignumber.js';

export interface GaugeControllerInterface {
  voteForGaugeWeights: (
    args: VoteForGaugeWeightsParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
}

export type GaugeControllerConfig = {
  GAUGE_CONTROLLER: tEthereumAddress;
  MNT: tEthereumAddress;
};

export class GaugeController
  extends BaseService<IGaugeController>
  implements GaugeControllerInterface
{
  readonly erc20Service: IERC20ServiceInterface;

  readonly gaugeControllerAddress: string;
  readonly mntAddress: string;

  readonly wethGatewayService: WETHGatewayInterface;

  public get contract() {
    return this.getContractInstance(this.gaugeControllerAddress);
  }

  constructor(
    provider: providers.Provider,
    gaugeControllerConfig?: GaugeControllerConfig,
  ) {
    super(provider, IGaugeController__factory);

    const { GAUGE_CONTROLLER, MNT } = gaugeControllerConfig ?? {};

    this.gaugeControllerAddress = GAUGE_CONTROLLER ?? '';
    this.mntAddress = MNT ?? '';

    // initialize services
    this.erc20Service = new ERC20Service(provider);
  }

  public async voteForGaugeWeights(
    @isEthAddress('user')
    @isEthAddress('gaugeAddr')
    { user, gaugeAddr, userWeight }: VoteForGaugeWeightsParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        this.contract.populateTransaction.vote_for_gauge_weights(
          gaugeAddr,
          new BigNumber(userWeight * 100).toFixed(0, 1),
        ),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(
        [],
        txCallback,
        ProtocolAction.supply,
      ),
    });

    return txs;
  }
}
