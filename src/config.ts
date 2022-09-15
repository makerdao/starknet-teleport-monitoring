import { invert } from 'lodash'

import { NetworkConfig } from './types'

export const chainIds = {
  GOERLI: 5,
}
export const idsToChains = invert(chainIds)

export const networks: { [id: number]: NetworkConfig } = {
  [chainIds.GOERLI]: {
    networkName: 'goerli',
    name: 'GOERLI-MASTER-1',
    sdkName: 'Goerli',
    slaves: [
      {
        name: 'ALPHA_GOERLI-SLAVE-STARKNET-1',
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
}
