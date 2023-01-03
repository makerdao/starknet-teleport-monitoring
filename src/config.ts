import { invert } from 'lodash'

import { NetworkConfig } from './types'

export const chainIds = {
  GOERLI: 5,
  MAINNET: 1,
}
export const idsToChains = invert(chainIds)

export const networks: { [id: number]: NetworkConfig } = {
  [chainIds.GOERLI]: {
    networkName: 'goerli',
    name: 'ETH-GOER-A',
    sdkName: 'Goerli',
    slaves: [
      {
        name: 'STA-GOER-A',
        l2Rpc: {
          rpc: {
            nodeUrl: 'https://starknet-goerli.infura.io/v3/0a0b5cc7abb944b184c6355cccbe5984',
          },
        },
        sdkName: 'StarknetGoerli',
        bridgeDeploymentBlock: 6981585,
        syncBatchSize: 100_000,
      },
    ],
    joinDeploymentBlock: 6861356,
    syncBatchSize: 100_000,
  },
  [chainIds.MAINNET]: {
    networkName: 'mainnet',
    name: 'ETH-MAIN-A',
    sdkName: 'Mainnet',
    slaves: [
      {
        name: 'STA-MAIN-A',
        l2Rpc: {
          rpc: {
            nodeUrl: 'https://starknet-mainnet.infura.io/v3/0a0b5cc7abb944b184c6355cccbe5984',
          },
        },
        sdkName: 'StarknetMainnet',
        bridgeDeploymentBlock: 0,
        syncBatchSize: 100_000,
      },
    ],
    joinDeploymentBlock: 0,
    syncBatchSize: 100_000,
  },
}
