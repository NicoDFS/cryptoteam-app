let config = {
    address: '0x3e638A3d1e71c43aC596f2C536dB8EB7E3676355',
    abi: [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_pauseState",
                    "type": "bool"
                }
            ],
            "name": "pause",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_expectedAmount",
                    "type": "uint256"
                },
                {
                    "name": "seller",
                    "type": "address"
                }
            ],
            "name": "buyFromUser",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_expectedAmount",
                    "type": "uint256"
                }
            ],
            "name": "buyFromContract",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_seller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "Buy",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]
}

export default config;