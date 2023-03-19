/** @type import('hardhat/config').HardhatUserConfig */
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const optimismGoerliUrl = `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` 


const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.18",
  networks:{
   goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
  "optimism-goerli": {
    url: optimismGoerliUrl,
    accounts: { mnemonic: process.env.MNEMONIC }
 }   
}
};