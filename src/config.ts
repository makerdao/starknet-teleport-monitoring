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
        name: 'ALPHA_GOERLI-SLAVE-1',
        l2Rpc: {
          rpc: {
            nodeUrl: 'https://starknet-goerli.infura.io/v3/56387818e18e404a9a6d2391af0e9085',
          },
        },
        sdkName: 'StarknetGoerli',
        bridgeDeploymentBlock: 330000,
        syncBatchSize: 100_000,
      },
    ],
    joinDeploymentBlock: 330000,
    syncBatchSize: 100_000,
  },
}
