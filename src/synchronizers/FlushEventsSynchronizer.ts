import { Flush } from '@prisma/client'
import { parseBytes32String } from 'ethers/lib/utils'
import { hash } from 'starknet'

import { BlockchainClient } from '../peripherals/blockchain'
import { FlushRepository } from '../peripherals/db/FlushRepository'
import { SynchronizerStatusRepository } from '../peripherals/db/SynchronizerStatusRepository'
import { TxHandle } from '../peripherals/db/utils'
import { L2Sdk } from '../sdks'
import { toL1String } from '../utils'
import { GenericSynchronizer } from './GenericSynchronizer'

export class FlushEventsSynchronizer extends GenericSynchronizer {
  constructor(
    blockchain: BlockchainClient,
    synchronizerStatusRepository: SynchronizerStatusRepository,
    domainName: string,
    startingBlock: number,
    blocksPerBatch: number,
    private readonly flushRepository: FlushRepository,
    private readonly l2Sdk: L2Sdk,
  ) {
    super(blockchain, synchronizerStatusRepository, domainName, startingBlock, blocksPerBatch)
  }

  async sync(from: number, to: number) {
    const filter = {
      fromBlock: { block_number: from },
      toBlock: { block_number: to - 1 },
      address: this.l2Sdk.teleportGateway.address,
      keys: [hash.getSelectorFromName('Flushed')],
      page_size: 50,
      page_number: 0,
    }

    // @ts-ignore StarknetJs types are wrong
    const { events: newFlushes } = await this.l2Sdk.provider.getEvents(filter)
    console.log(`[${this.syncName}] Found ${newFlushes.length} new flushes`)

    const modelsToCreate: Omit<Flush, 'id'>[] = await Promise.all(
      newFlushes.map(async (w: any) => {
        const blockNumber = w.block_number
        const block = await this.l2Sdk.provider.getBlock(blockNumber)
        return {
          sourceDomain: this.domainName,
          targetDomain: parseBytes32String(toL1String(w.data[0])),
          amount: w.data[1].toString(),
          timestamp: new Date(block.timestamp * 1000),
        }
      }),
    )

    return (tx: TxHandle) => this.flushRepository.createMany(modelsToCreate, tx)
  }
}
