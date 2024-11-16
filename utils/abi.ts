export const ERC20ABI = [
    {
      type: 'function',
      name: 'name',
      stateMutability: 'view',
      inputs: [],
      outputs: [{name: "", type: "string"}],
    },
    {
      type: 'function',
      name: 'symbol',
      stateMutability: 'view',
      inputs: [],
      outputs: [{name: "", type: "string"}],
    },
    {
      type: 'function',
      name: 'transfer',
      stateMutability: 'nonpayable',
      inputs: [
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      outputs: [{ name: '', type: 'bool' }],
    },
  ] as const