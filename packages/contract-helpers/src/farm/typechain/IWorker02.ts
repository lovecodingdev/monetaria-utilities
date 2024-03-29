/* Autogenerated file. Do not edit manually. */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../../common';

export interface IWorker02Interface extends utils.Interface {
  functions: {
    'baseToken()': FunctionFragment;
    'farmingToken()': FunctionFragment;
    'getPath()': FunctionFragment;
    'getReversedPath()': FunctionFragment;
    'getRewardPath()': FunctionFragment;
    'health(uint256)': FunctionFragment;
    'liquidate(uint256)': FunctionFragment;
    'lpToken()': FunctionFragment;
    'reinvest()': FunctionFragment;
    'setReinvestorOk(address[],bool)': FunctionFragment;
    'setStrategyOk(address[],bool)': FunctionFragment;
    'work(uint256,address,uint256,bytes)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'baseToken'
      | 'farmingToken'
      | 'getPath'
      | 'getReversedPath'
      | 'getRewardPath'
      | 'health'
      | 'liquidate'
      | 'lpToken'
      | 'reinvest'
      | 'setReinvestorOk'
      | 'setStrategyOk'
      | 'work',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'baseToken', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'farmingToken',
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: 'getPath', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getReversedPath',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'getRewardPath',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'health',
    values: [PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: 'liquidate',
    values: [PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: 'lpToken', values?: undefined): string;
  encodeFunctionData(functionFragment: 'reinvest', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setReinvestorOk',
    values: [PromiseOrValue<string>[], PromiseOrValue<boolean>],
  ): string;
  encodeFunctionData(
    functionFragment: 'setStrategyOk',
    values: [PromiseOrValue<string>[], PromiseOrValue<boolean>],
  ): string;
  encodeFunctionData(
    functionFragment: 'work',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
    ],
  ): string;

  decodeFunctionResult(functionFragment: 'baseToken', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'farmingToken',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'getPath', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'getReversedPath',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getRewardPath',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'health', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lpToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'reinvest', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setReinvestorOk',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setStrategyOk',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'work', data: BytesLike): Result;

  events: {};
}

export interface IWorker02 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWorker02Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    baseToken(overrides?: CallOverrides): Promise<[string]>;

    farmingToken(overrides?: CallOverrides): Promise<[string]>;

    getPath(overrides?: CallOverrides): Promise<[string[]]>;

    getReversedPath(overrides?: CallOverrides): Promise<[string[]]>;

    getRewardPath(overrides?: CallOverrides): Promise<[string[]]>;

    health(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    liquidate(
      id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    lpToken(overrides?: CallOverrides): Promise<[string]>;

    reinvest(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setReinvestorOk(
      reinvestor: PromiseOrValue<string>[],
      isOk: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setStrategyOk(
      strats: PromiseOrValue<string>[],
      isOk: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    work(
      id: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      debt: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;
  };

  baseToken(overrides?: CallOverrides): Promise<string>;

  farmingToken(overrides?: CallOverrides): Promise<string>;

  getPath(overrides?: CallOverrides): Promise<string[]>;

  getReversedPath(overrides?: CallOverrides): Promise<string[]>;

  getRewardPath(overrides?: CallOverrides): Promise<string[]>;

  health(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  liquidate(
    id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  lpToken(overrides?: CallOverrides): Promise<string>;

  reinvest(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setReinvestorOk(
    reinvestor: PromiseOrValue<string>[],
    isOk: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setStrategyOk(
    strats: PromiseOrValue<string>[],
    isOk: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  work(
    id: PromiseOrValue<BigNumberish>,
    user: PromiseOrValue<string>,
    debt: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  callStatic: {
    baseToken(overrides?: CallOverrides): Promise<string>;

    farmingToken(overrides?: CallOverrides): Promise<string>;

    getPath(overrides?: CallOverrides): Promise<string[]>;

    getReversedPath(overrides?: CallOverrides): Promise<string[]>;

    getRewardPath(overrides?: CallOverrides): Promise<string[]>;

    health(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    liquidate(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    lpToken(overrides?: CallOverrides): Promise<string>;

    reinvest(overrides?: CallOverrides): Promise<void>;

    setReinvestorOk(
      reinvestor: PromiseOrValue<string>[],
      isOk: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<void>;

    setStrategyOk(
      strats: PromiseOrValue<string>[],
      isOk: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<void>;

    work(
      id: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      debt: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    baseToken(overrides?: CallOverrides): Promise<BigNumber>;

    farmingToken(overrides?: CallOverrides): Promise<BigNumber>;

    getPath(overrides?: CallOverrides): Promise<BigNumber>;

    getReversedPath(overrides?: CallOverrides): Promise<BigNumber>;

    getRewardPath(overrides?: CallOverrides): Promise<BigNumber>;

    health(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    liquidate(
      id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    lpToken(overrides?: CallOverrides): Promise<BigNumber>;

    reinvest(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setReinvestorOk(
      reinvestor: PromiseOrValue<string>[],
      isOk: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setStrategyOk(
      strats: PromiseOrValue<string>[],
      isOk: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    work(
      id: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      debt: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    baseToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    farmingToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPath(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getReversedPath(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRewardPath(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    health(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    liquidate(
      id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    lpToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reinvest(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setReinvestorOk(
      reinvestor: PromiseOrValue<string>[],
      isOk: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setStrategyOk(
      strats: PromiseOrValue<string>[],
      isOk: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    work(
      id: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      debt: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;
  };
}
