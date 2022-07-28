import { invert } from 'lodash'

import { NetworkConfig } from './types'

export const chainIds = {
  GOERLI: 5,
}
export const idsToChains = invert(chainIds)

export const networks: { [id: number]: NetworkConfig } = {
  [chainIds.GOERLI]: {
    networkName: 'goerli',
    name: 'STARKNET-MASTER-1',
    sdkName: 'Goerli',
    slaves: [
      {
        name: 'STARKNET-SLAVE-GOERLI-1',
        l2Rpc: {
          rpc: {
            nodeUrl: 'https://alpha4.starknet.io',
            // nodeUrl: 'http://localhost:9545',
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
}
