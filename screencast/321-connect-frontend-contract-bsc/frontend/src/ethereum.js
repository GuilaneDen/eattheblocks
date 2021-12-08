import { ethers, Contract } from 'ethers';
const { LedgerSigner } = require('@ethersproject/hardware-wallets')

const getBlockchain = () =>
  new Promise( async (resolve, reject) => {
    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
    // const signer = provider.getSigner("0x63E891Eae83A51812E8139f3f5bFC94c2672DD52");
    console.log(LedgerSigner);
    const signer = new LedgerSigner(provider,'hid')

    if(provider) {
      const simpleStorage = new Contract(
        "0x6DA3b94B717c4DCacCF2933Bc7F41a7892031477",
        [
          {
            "inputs": [],
            "name": "data",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "readData",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_data",
                "type": "uint256"
              }
            ],
            "name": "updateData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        signer
      );
      resolve({simpleStorage});
      return;
    }
    reject('Install Metamask');
  });

export default getBlockchain;
