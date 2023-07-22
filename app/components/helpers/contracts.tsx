export function stringToColour(text: string) {
  var hash = 0;
  for (var i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export function hexToRgbA(hex: string) {
  var c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
  }
  throw new Error('Bad Hex');
}

export const contracts = {
  controller: {
    address: {
      Goerli: '0xa0C21F3f1359f45890f918CFd340361CcD91627B',
      Optimism: '0x94E9b8A9bf9C7d8e8A3AF85A387b1CbFf2a47884',
      Gnosis: '0x94E9b8A9bf9C7d8e8A3AF85A387b1CbFf2a47884',
      'Scroll Testnet': '0x94E9b8A9bf9C7d8e8A3AF85A387b1CbFf2a47884',
      'Polygon zkEVM Testnet': '0xb76633e091B70b41Fbc7c1D865Fa20bC41B242A3'
    },
    abi: [
      {
        name: 'createWrapper',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
        outputs: [],
      },
      {
        name: 'allWrappers',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }
        ],
      },
      {
        name: 'addModule',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'address', name: 'module', type: 'address' }],
        outputs: [],
      },
      {
        name: 'allModules',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }
        ],
      },
      {
        inputs: [{ indexed: true, internalType: "address", name: "module", type: "address" }],
        name: "ModuleAdded",
        type: "event"
      },
    ]
  },
  wrapper: {
    abi: [
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "wrapped",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        name: 'decimals',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }
        ],
      },
      {
        inputs: [{ internalType: "address", name: "module", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }],
        name: "depositAndRestake",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [{ internalType: "address", name: "module", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }],
        name: "unrestakeAndWithdraw",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          },
          {
            internalType: "address",
            nam: "",
            type: "address"
          }
        ],
        name: "restakedAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ]
  },
  module: {
    abi: [
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "image",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "getWrappers",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function"
      },
    ]
  }
}
