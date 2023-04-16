import { BigNumber, providers } from 'ethers';
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
import { LiquidityGauge as ILiquidityGauge } from './typechain/LiquidityGauge';
import { LiquidityGauge__factory as ILiquidityGauge__factory } from './typechain/LiquidityGauge__factory';
import {
  CalcUpdateLiquidityLimitParamsType,
  DepositParamsType,
  WithdrawParamsType,
} from './types/LiquidityGaugeTypes';
import { VotingEscrow } from './VotingEscrow';

export interface LiquidityGaugeInterface {
  deposit: (
    args: DepositParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
  withdraw: (
    args: WithdrawParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
  calcUpdateLiquidityGauge: (
    args: CalcUpdateLiquidityLimitParamsType,
  ) => Promise<number[]>;
}

export type LiquidityGaugeConfig = {
  LIQUIDITY_GAUGE: tEthereumAddress;
};

export class LiquidityGauge
  extends BaseService<ILiquidityGauge>
  implements LiquidityGaugeInterface
{
  readonly erc20Service: IERC20ServiceInterface;
  readonly votingEscrow: VotingEscrow;

  readonly liquidityGaugeAddress: string;

  readonly wethGatewayService: WETHGatewayInterface;

  public get contract() {
    return this.getContractInstance(this.liquidityGaugeAddress);
  }

  constructor(
    provider: providers.Provider,
    liquidityGaugeConfig?: LiquidityGaugeConfig,
  ) {
    super(provider, ILiquidityGauge__factory);

    const { LIQUIDITY_GAUGE } = liquidityGaugeConfig ?? {};

    this.liquidityGaugeAddress = LIQUIDITY_GAUGE ?? '';

    // initialize services
    this.erc20Service = new ERC20Service(provider);
  }

  public async deposit(
    @isEthAddress('user')
    @isPositiveAmount('amount')
    { user, amount }: DepositParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    let mTokenAddress = await this.contract.lp_token();

    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface =
      this.erc20Service;
    const txs: EthereumTransactionTypeExtended[] = [];
    const mTokenDecimals: number = await decimalsOf(mTokenAddress);
    const convertedAmount: string = valueToWei(amount, mTokenDecimals);

    const approved = await isApproved({
      token: mTokenAddress,
      user,
      spender: this.liquidityGaugeAddress,
      amount: DEFAULT_APPROVE_AMOUNT,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: mTokenAddress,
        spender: this.liquidityGaugeAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        this.contract.populateTransaction['deposit(uint256)'](convertedAmount),
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

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        this.contract.populateTransaction['withdraw(uint256)'](convertedAmount),
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

  public async calcUpdateLiquidityGauge(
    @isEthAddress('user')
    { user, l, L, veCRV, totalveCRV }: CalcUpdateLiquidityLimitParamsType,
  ): Promise<number[]> {
    const { decimalsOf }: IERC20ServiceInterface = this.erc20Service;
    const gaugeDecimals = await decimalsOf(this.liquidityGaugeAddress);
    const veDecimals = await decimalsOf(await this.contract.VOTING_ESCROW());

    l = valueToWei(l, gaugeDecimals);
    L = valueToWei(L, gaugeDecimals);
    veCRV = valueToWei(veCRV, veDecimals);
    totalveCRV = valueToWei(totalveCRV, veDecimals);

    let workingBalances = await this.contract.working_balances(user);
    let workingSupply = await this.contract.working_supply();

    let TOKENLESS_PRODUCTION = 40;

    let lim = BigNumber.from(l).mul(TOKENLESS_PRODUCTION).div(100);
    lim = lim.add(
      BigNumber.from(L)
        .mul(veCRV)
        .div(totalveCRV)
        .mul(100 - TOKENLESS_PRODUCTION)
        .div(100),
    );
    if (lim.gt(BigNumber.from(l))) {
      lim = BigNumber.from(l);
    }
    let old_bal = workingBalances;
    let noboostLim = BigNumber.from(l).mul(TOKENLESS_PRODUCTION).div(100);
    let noboostSupply = workingSupply.add(noboostLim).sub(old_bal);
    let _workingSupply = workingSupply.add(lim).sub(old_bal);
    return [
      _workingSupply.toNumber(),
      lim.div(_workingSupply).div(noboostLim.div(noboostSupply)).toNumber(),
    ];
  }
}
