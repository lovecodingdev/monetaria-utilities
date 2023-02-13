import { BytesLike, Signature, splitSignature } from '@ethersproject/bytes';
import { BigNumberish, constants, ethers, providers, utils } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  InterestRate,
  ProtocolAction,
  tEthereumAddress,
  transactionType,
} from '../commons/types';
import {
  API_ETH_MOCK_ADDRESS,
  augustusToAmountOffsetFromCalldata,
  DEFAULT_APPROVE_AMOUNT,
  getTxValue,
  SURPLUS,
  valueToWei,
} from '../commons/utils';
import {
  LPFlashLiquidationValidatorV3,
  LPRepayWithCollateralValidatorV3,
  LPSwapCollateralValidatorV3,
  LPValidatorV3,
} from '../commons/validators/methodValidators';
import {
  is0OrPositiveAmount,
  isEthAddress,
  isPositiveAmount,
  isPositiveOrMinusOneAmount,
} from '../commons/validators/paramValidators';
import { ERC20_2612Service, ERC20_2612Interface } from '../erc20-2612';
import { ERC20Service, IERC20ServiceInterface } from '../erc20-contract';
import {
  augustusFromAmountOffsetFromCalldata,
  LiquiditySwapAdapterInterface,
  LiquiditySwapAdapterService,
} from '../paraswap-liquiditySwapAdapter-contract';
import {
  ParaswapRepayWithCollateral,
  ParaswapRepayWithCollateralInterface,
} from '../paraswap-repayWithCollateralAdapter-contract';
import { SynthetixInterface, SynthetixService } from '../synthetix-contract';
import { L2Pool, L2PoolInterface } from '../v3-pool-rollups';
import {
  WETHGatewayInterface,
  WETHGatewayService,
} from '../wethgateway-contract';
import { WorkParamsType } from './farmTypes';
import { Farming as IFarming } from './typechain/Farming';
import { Farming__factory as IFarming__factory } from './typechain/Farming__factory';
import { IWorker02 } from './typechain/IWorker02';
import { IWorker02__factory } from './typechain/IWorker02__factory';

export interface FarmingInterface {
  work: (args: WorkParamsType) => Promise<EthereumTransactionTypeExtended[]>;
}

export type FarmingConfig = {
  FARMING: tEthereumAddress;
  WETH_GATEWAY?: tEthereumAddress;
};

export class Farming extends BaseService<IFarming> implements FarmingInterface {
  readonly erc20Service: IERC20ServiceInterface;

  readonly farmingAddress: string;

  readonly wethGatewayService: WETHGatewayInterface;

  constructor(provider: providers.Provider, lendingPoolConfig?: FarmingConfig) {
    super(provider, IFarming__factory);

    const { FARMING, WETH_GATEWAY } = lendingPoolConfig ?? {};

    this.farmingAddress = FARMING ?? '';

    // initialize services
    this.erc20Service = new ERC20Service(provider);
    this.wethGatewayService = new WETHGatewayService(
      provider,
      this.erc20Service,
      WETH_GATEWAY,
    );
  }

  @LPValidatorV3
  public async work(
    @isEthAddress('user')
    @isEthAddress('mTokenAddress')
    @isEthAddress('workerAddress')
    @isEthAddress('strategyAddress')
    @isPositiveAmount('borrowAmount')
    @isPositiveAmount('farmingAmount')
    {
      user,
      mTokenAddress,
      workerAddress,
      strategyAddress,
      borrowAmount,
      farmingAmount,
    }: WorkParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface =
      this.erc20Service;
    const txs: EthereumTransactionTypeExtended[] = [];
    // const reserveDecimals: number = await decimalsOf(reserve);
    // const convertedAmount: string = valueToWei(amount, reserveDecimals);
    const worker = IWorker02__factory.connect(workerAddress, this.provider);

    const approved = await isApproved({
      token: await worker.farmingToken(),
      user,
      spender: workerAddress,
      amount: DEFAULT_APPROVE_AMOUNT,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: await worker.farmingToken(),
        spender: workerAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const farmingContract: IFarming = this.getContractInstance(
      this.farmingAddress,
    );

    // TODO: calcurate minOutputAmount from FarmInteractionCalculator;
    const minOutputAmount = '0';
    const encodedStrategyParams = ethers.utils.defaultAbiCoder.encode(
      ['uint256', 'uint256'],
      [farmingAmount, minOutputAmount],
    );

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        farmingContract.populateTransaction.work(
          0,
          mTokenAddress,
          workerAddress,
          '0',
          borrowAmount,
          '0',
          ethers.utils.defaultAbiCoder.encode(
            ['address', 'bytes'],
            [strategyAddress, encodedStrategyParams],
          ),
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
