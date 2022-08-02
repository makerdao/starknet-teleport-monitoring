require('dotenv').config()
require('@nomiclabs/hardhat-ethers')

module.exports = {
  solidity: '0.7.3',
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      enabled: true,
      forking: {
        url: process.env.TEST_RPC,
      },
    },
  },
}
