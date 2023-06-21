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
  CreateLockParamsType,
  IncreaseAmountParamsType,
  IncreaseUnlockTimeParamsType,
  WithdrawParamsType,
} from './types/VotingEscrowTypes';
import { VotingEscrow as IVotingEscrow } from './typechain/VotingEscrow';
import { VotingEscrow__factory as IVotingEscrow__factory } from './typechain/VotingEscrow__factory';
import { BigNumber } from 'bignumber.js';

export interface VotingEscrowInterface {
  createLock: (
    args: CreateLockParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
  increaseAmount: (
    args: IncreaseAmountParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
  increaseUnlockTime: (
    args: IncreaseUnlockTimeParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
  withdraw: (
    args: WithdrawParamsType,
  ) => Promise<EthereumTransactionTypeExtended[]>;
}

export type VotingEscrowConfig = {
  VOTING_ESCROW: tEthereumAddress;
  MNT: tEthereumAddress;
};

export class VotingEscrow
  extends BaseService<IVotingEscrow>
  implements VotingEscrowInterface
{
  readonly erc20Service: IERC20ServiceInterface;

  readonly votingEscrowAddress: string;
  readonly mntAddress: string;

  readonly wethGatewayService: WETHGatewayInterface;

  public get contract() {
    return this.getContractInstance(this.votingEscrowAddress);
  }

  constructor(
    provider: providers.Provider,
    votingEscrowConfig?: VotingEscrowConfig,
  ) {
    super(provider, IVotingEscrow__factory);

    const { VOTING_ESCROW, MNT } = votingEscrowConfig ?? {};

    this.votingEscrowAddress = VOTING_ESCROW ?? '';
    this.mntAddress = MNT ?? '';

    // initialize services
    this.erc20Service = new ERC20Service(provider);
  }

  public async createLock(
    @isEthAddress('user')
    @isPositiveAmount('amount')
    { user, amount, unlockTime }: CreateLockParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface =
      this.erc20Service;
    const txs: EthereumTransactionTypeExtended[] = [];
    const mntDecimals: number = await decimalsOf(this.mntAddress);
    const convertedAmount: string = valueToWei(amount, mntDecimals);

    const approved = await isApproved({
      token: this.mntAddress,
      user,
      spender: this.votingEscrowAddress,
      amount,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: this.mntAddress,
        spender: this.votingEscrowAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        this.contract.populateTransaction.create_lock(
          convertedAmount,
          new BigNumber(unlockTime / 1000).toFixed(0, 1),
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

  public async increaseAmount(
    @isEthAddress('user')
    @isPositiveAmount('amount')
    { user, amount }: IncreaseAmountParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface =
      this.erc20Service;
    const txs: EthereumTransactionTypeExtended[] = [];
    const mntDecimals: number = await decimalsOf(this.mntAddress);
    const convertedAmount: string = valueToWei(amount, mntDecimals);

    const approved = await isApproved({
      token: this.mntAddress,
      user,
      spender: this.votingEscrowAddress,
      amount,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: this.mntAddress,
        spender: this.votingEscrowAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        this.contract.populateTransaction.increase_amount(convertedAmount),
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

  public async increaseUnlockTime(
    @isEthAddress('user')
    { user, unlockTime }: IncreaseUnlockTimeParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        this.contract.populateTransaction.increase_unlock_time(
          new BigNumber(unlockTime / 1000).toFixed(0, 1),
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

  public async withdraw(
    @isEthAddress('user')
    { user }: WithdrawParamsType,
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => this.contract.populateTransaction.withdraw(),
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
