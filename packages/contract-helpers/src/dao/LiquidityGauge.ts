import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  ProtocolAction,
  tEthereumAddress,
  transactionType,
} from '../commons/types';
import { DEFAULT_APPROVE_AMOUNT, valueToWei } from '../commons/utils';
import {
  isEthAddress,
  isPositiveAmount,
} from '../commons/validators/paramValidators';
import { ERC20Service, IERC20ServiceInterface } from '../erc20-contract';
import { WETHGatewayInterface } from '../wethgateway-contract';
import {
  DepositParamsType,
  WithdrawParamsType,
} from './types/LiquidityGaugeTypes';
import { LiquidityGauge as ILiquidityGauge } from './typechain/LiquidityGauge';
import { LiquidityGauge__factory as ILiquidityGauge__factory } from './typechain/LiquidityGauge__factory';
// import { BigNumber } from 'bignumber.js';

export interface LiquidityGaugeInterface {
  deposit: (
    args: DepositParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
  withdraw: (
    args: WithdrawParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
}

export type LiquidityGaugeConfig = {
  VOTING_ESCROW: tEthereumAddress;
  MTOKEN: tEthereumAddress;
};

export class LiquidityGauge
  extends BaseService<ILiquidityGauge>
  implements LiquidityGaugeInterface
{
  readonly erc20Service: IERC20ServiceInterface;

  readonly liquidityGaugeAddress: string;
  readonly mTokenAddress: string;

  readonly wethGatewayService: WETHGatewayInterface;

  constructor(
    provider: providers.Provider,
    liquidityGaugeConfig?: LiquidityGaugeConfig,
  ) {
    super(provider, ILiquidityGauge__factory);

    const { VOTING_ESCROW, MTOKEN } = liquidityGaugeConfig ?? {};

    this.liquidityGaugeAddress = VOTING_ESCROW ?? '';
    this.mTokenAddress = MTOKEN ?? '';

    // initialize services
    this.erc20Service = new ERC20Service(provider);
  }

  public async deposit(
    @isEthAddress('user')
    @isPositiveAmount('amount')
    { user, amount }: DepositParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface =
      this.erc20Service;
    const txs: EthereumTransactionTypeExtended[] = [];
    const mTokenDecimals: number = await decimalsOf(this.mTokenAddress);
    const convertedAmount: string = valueToWei(amount, mTokenDecimals);

    const approved = await isApproved({
      token: this.mTokenAddress,
      user,
      spender: this.liquidityGaugeAddress,
      amount: DEFAULT_APPROVE_AMOUNT,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: this.mTokenAddress,
        spender: this.liquidityGaugeAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const liquidityGaugeContract: ILiquidityGauge = this.getContractInstance(
      this.liquidityGaugeAddress,
    );

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        liquidityGaugeContract.populateTransaction['deposit(uint256)'](
          convertedAmount,
        ),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(
        txs,
        txCallback,
        ProtocolAction.supply,
      ),
    });

    return txs;
  }

  public async withdraw(
    @isEthAddress('user')
    @isPositiveAmount('amount')
    { user, amount }: DepositParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    const { decimalsOf }: IERC20ServiceInterface = this.erc20Service;

    const txs: EthereumTransactionTypeExtended[] = [];
    const decimals: number = await decimalsOf(this.liquidityGaugeAddress);
    const convertedAmount: string = valueToWei(amount, decimals);

    const liquidityGaugeContract: ILiquidityGauge = this.getContractInstance(
      this.liquidityGaugeAddress,
    );

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        liquidityGaugeContract.populateTransaction['withdraw(uint256)'](
          convertedAmount,
        ),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(
        txs,
        txCallback,
        ProtocolAction.supply,
      ),
    });

    return txs;
  }
}
