/* Autogenerated file. Do not edit manually. */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { PromiseOrValue } from '../../common';
import type { MNTToken, MNTTokenInterface } from './MNTToken';

const _abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'REVISION',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'available_supply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_epoch_time_write',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mining_epoch',
    outputs: [
      {
        internalType: 'int128',
        name: '',
        type: 'int128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
    ],
    name: 'mintable_in_timeframe',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minter',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'set_admin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_minter',
        type: 'address',
      },
    ],
    name: 'set_minter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'start_epoch_time',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'start_epoch_time_write',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'update_mining_parameters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

const _bytecode =
  '0x60806040523480156200001157600080fd5b506040518060400160405280600f81526020016e26b7b732ba30b934b0902a37b5b2b760891b8152506040518060400160405280600381526020016213539560ea1b81525081600390805190602001906200006e929190620001fb565b50805162000084906004906020840190620001fb565b50505060006012600a620000999190620003b6565b620000a990634daaaa1f620003ce565b9050620000b7338262000113565b600a80546001600160a01b031916331790556301e13380620000dd6201518042620003f0565b620000e991906200040b565b600655600580546001600160801b0319166001600160801b03179055600060075560085562000462565b6001600160a01b0382166200016e5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620001829190620003f0565b90915550506001600160a01b03821660009081526020819052604081208054839290620001b1908490620003f0565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620002099062000425565b90600052602060002090601f0160209004810192826200022d576000855562000278565b82601f106200024857805160ff191683800117855562000278565b8280016001018555821562000278579182015b82811115620002785782518255916020019190600101906200025b565b50620002869291506200028a565b5090565b5b808211156200028657600081556001016200028b565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620002f8578160001904821115620002dc57620002dc620002a1565b80851615620002ea57918102915b93841c9390800290620002bc565b509250929050565b6000826200031157506001620003b0565b816200032057506000620003b0565b8160018114620003395760028114620003445762000364565b6001915050620003b0565b60ff841115620003585762000358620002a1565b50506001821b620003b0565b5060208310610133831016604e8410600b841016171562000389575081810a620003b0565b620003958383620002b7565b8060001904821115620003ac57620003ac620002a1565b0290505b92915050565b6000620003c760ff84168362000300565b9392505050565b6000816000190483118215151615620003eb57620003eb620002a1565b500290565b60008219821115620004065762000406620002a1565b500190565b600082821015620004205762000420620002a1565b500390565b600181811c908216806200043a57607f821691505b602082108114156200045c57634e487b7160e01b600052602260045260246000fd5b50919050565b6114a880620004726000396000f3fe608060405234801561001057600080fd5b50600436106101a35760003560e01c80637375be26116100ee578063d43b40fa11610097578063dde43cba11610071578063dde43cba1461038c578063e9333fab14610394578063f851a440146103a7578063f9a40bf6146103c757600080fd5b8063d43b40fa1461032b578063d725a9ca14610333578063dd62ed3e1461034657600080fd5b8063a9059cbb116100c8578063a9059cbb14610308578063adc4cf431461031b578063b26b238e1461032357600080fd5b80637375be26146102e457806395d89b41146102ed578063a457c2d7146102f557600080fd5b806324f92a2511610150578063395093511161012a578063395093511461028857806340c10f191461029b57806370a08231146102ae57600080fd5b806324f92a25146102685780632c4e722e14610270578063313ce5671461027957600080fd5b80631652e9fc116101815780631652e9fc1461022e57806318160ddd1461024357806323b872dd1461025557600080fd5b806306fdde03146101a857806307546172146101c6578063095ea7b31461020b575b600080fd5b6101b06103e7565b6040516101bd919061112b565b60405180910390f35b6009546101e69073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101bd565b61021e6102193660046111c2565b610479565b60405190151581526020016101bd565b61024161023c3660046111ec565b610491565b005b6002545b6040519081526020016101bd565b61021e61026336600461120e565b61051f565b610247610543565b61024760075481565b604051601281526020016101bd565b61021e6102963660046111c2565b610552565b61021e6102a93660046111c2565b61059e565b6102476102bc3660046111ec565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b61024760065481565b6101b061062f565b61021e6103033660046111c2565b61063e565b61021e6103163660046111c2565b610714565b610247610722565b610247610751565b610241610799565b61024761034136600461124a565b6107c1565b61024761035436600461126c565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b610247600181565b6102416103a23660046111ec565b61094d565b600a546101e69073ffffffffffffffffffffffffffffffffffffffff1681565b6005546103d490600f0b81565b604051600f9190910b81526020016101bd565b6060600380546103f69061129f565b80601f01602080910402602001604051908101604052809291908181526020018280546104229061129f565b801561046f5780601f106104445761010080835404028352916020019161046f565b820191906000526020600020905b81548152906001019060200180831161045257829003601f168201915b5050505050905090565b6000336104878185856109b8565b5060019392505050565b600a5473ffffffffffffffffffffffffffffffffffffffff1633146104b557600080fd5b60095473ffffffffffffffffffffffffffffffffffffffff16156104d857600080fd5b600980547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60003361052d858285610b6b565b610538858585610c42565b506001949350505050565b600061054d610ef5565b905090565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff871684529091528120549091906104879082908690610599908790611322565b6109b8565b60095460009073ffffffffffffffffffffffffffffffffffffffff1633146105c557600080fd5b73ffffffffffffffffffffffffffffffffffffffff8316156105e657600080fd5b6301e133806006546105f89190611322565b421061060657610606610f1f565b61060e610ef5565b600254111561061c57600080fd5b610626838361100b565b50600192915050565b6060600480546103f69061129f565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919083811015610707576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61053882868684036109b8565b600033610487818585610c42565b6006546000906107366301e1338082611322565b421061074c57610744610f1f565b505060065490565b919050565b6006546000906107656301e1338082611322565b421061078b57610773610f1f565b6301e133806006546107859190611322565b91505090565b6107856301e1338082611322565b6301e133806006546107ab9190611322565b4210156107b757600080fd5b6107bf610f1f565b565b6000818311156107d057600080fd5b600654600754600091906107e86301e1338083611322565b851115610827576107fd6301e1338083611322565b9150671080e992061ab30061081a670de0b6b3a76400008361133a565b6108249190611377565b90505b6108356301e1338083611322565b85111561084157600080fd5b60005b6103e7811015610942578286106108d457856108646301e1338085611322565b81111561087c576108796301e1338085611322565b90505b8761088b6301e1338086611322565b8110610898575050610942565b848110156108a35750835b6108ad81836113b2565b6108b7908561133a565b6108c19087611322565b95508489106108d1575050610942565b50505b6108e26301e13380846113b2565b9250670de0b6b3a76400006108ff671080e992061ab3008461133a565b6109099190611377565b91506109246301e133806ae3526657d187e01cec0000611377565b82111561093057600080fd5b8061093a816113c9565b915050610844565b509195945050505050565b600a5473ffffffffffffffffffffffffffffffffffffffff16331461097157600080fd5b600a80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b73ffffffffffffffffffffffffffffffffffffffff8316610a5a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016106fe565b73ffffffffffffffffffffffffffffffffffffffff8216610afd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016106fe565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8381166000908152600160209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610c3c5781811015610c2f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016106fe565b610c3c84848484036109b8565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8316610ce5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016106fe565b73ffffffffffffffffffffffffffffffffffffffff8216610d88576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f657373000000000000000000000000000000000000000000000000000000000060648201526084016106fe565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015610e3e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016106fe565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260208190526040808220858503905591851681529081208054849290610e82908490611322565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610ee891815260200190565b60405180910390a3610c3c565b600060075460065442610f0891906113b2565b610f12919061133a565b60085461054d9190611322565b600754600854600680546301e133809190600090610f3e908490611322565b90915550506005805460019190600090610f5c908490600f0b611402565b92506101000a8154816fffffffffffffffffffffffffffffffff0219169083600f0b6fffffffffffffffffffffffffffffffff1602179055508160001415610fbe57610fb76301e133806ae3526657d187e01cec0000611377565b9150611005565b610fcc6301e133808361133a565b610fd69082611322565b60088190559050671080e992061ab300610ff8670de0b6b3a76400008461133a565b6110029190611377565b91505b50600755565b73ffffffffffffffffffffffffffffffffffffffff8216611088576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016106fe565b806002600082825461109a9190611322565b909155505073ffffffffffffffffffffffffffffffffffffffff8216600090815260208190526040812080548392906110d4908490611322565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600060208083528351808285015260005b818110156111585785810183015185820160400152820161113c565b8181111561116a576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461074c57600080fd5b600080604083850312156111d557600080fd5b6111de8361119e565b946020939093013593505050565b6000602082840312156111fe57600080fd5b6112078261119e565b9392505050565b60008060006060848603121561122357600080fd5b61122c8461119e565b925061123a6020850161119e565b9150604084013590509250925092565b6000806040838503121561125d57600080fd5b50508035926020909101359150565b6000806040838503121561127f57600080fd5b6112888361119e565b91506112966020840161119e565b90509250929050565b600181811c908216806112b357607f821691505b602082108114156112ed577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008219821115611335576113356112f3565b500190565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611372576113726112f3565b500290565b6000826113ad577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000828210156113c4576113c46112f3565b500390565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156113fb576113fb6112f3565b5060010190565b600081600f0b83600f0b60008212826f7fffffffffffffffffffffffffffffff03821381151615611435576114356112f3565b827fffffffffffffffffffffffffffffffff80000000000000000000000000000000038212811615611469576114696112f3565b5001939250505056fea264697066735822122098957119754fc53b95deea6619a43339a7bfa868f4ba2020709997542f80f5a064736f6c63430008090033';

type MNTTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MNTTokenConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MNTToken__factory extends ContractFactory {
  constructor(...args: MNTTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<MNTToken> {
    return super.deploy(overrides || {}) as Promise<MNTToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MNTToken {
    return super.attach(address) as MNTToken;
  }
  override connect(signer: Signer): MNTToken__factory {
    return super.connect(signer) as MNTToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MNTTokenInterface {
    return new utils.Interface(_abi) as MNTTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): MNTToken {
    return new Contract(address, _abi, signerOrProvider) as MNTToken;
  }
}