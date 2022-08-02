import { providers } from 'ethers'
import { Provider } from 'starknet'

export interface BlockchainClient {
  getLatestBlockNumber(): Promise<number>
}

export class EthersBlockchainClient implements BlockchainClient {
  constructor(private readonly provider: providers.Provider) {}

  async getLatestBlockNumber(): Promise<number> {
    return (await this.provider.getBlock('latest')).number // note: getting block number directly doesnt work b/c optimism doesnt support it
  }
}

export class StarknetBlockchainClient implements BlockchainClient {
  constructor(private readonly provider: Provider) {}

  async getLatestBlockNumber(): Promise<number> {
    return this.provider["provider"].getBlockNumber()
  }
}
