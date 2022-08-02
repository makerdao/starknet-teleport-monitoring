import { Teleport } from '@prisma/client'
import { BigNumber } from 'ethers/lib/ethers'
import { defaultAbiCoder, keccak256, parseBytes32String } from 'ethers/lib/utils'
import { hash } from 'starknet';

import { BlockchainClient } from '../peripherals/blockchain'
import { SynchronizerStatusRepository } from '../peripherals/db/SynchronizerStatusRepository'
import { TeleportRepository } from '../peripherals/db/TeleportRepository'
import { TxHandle } from '../peripherals/db/utils'
import { L2Sdk } from '../sdks'
import { toBytes32,toL1String } from '../utils'
import { GenericSynchronizer } from './GenericSynchronizer'

export type OnChainTeleport = {
  sourceDomain: string
  targetDomain: string
  receiver: string
  operator: string
  amount: BigNumber
  nonce: BigNumber
  timestamp: number
}

export class InitEventsSynchronizer extends GenericSynchronizer {
  constructor(
    blockchain: BlockchainClient,
    synchronizerStatusRepository: SynchronizerStatusRepository,
    domainName: string,
    startingBlock: number,
    blocksPerBatch: number,
    private readonly teleportRepository: TeleportRepository,
    private readonly l2Sdk: L2Sdk,
  ) {
    super(blockchain, synchronizerStatusRepository, domainName, startingBlock, blocksPerBatch)
  }

  async sync(from: number, to: number) {
    const filter = {
      fromBlock: from,
      toBlock: (to-1),
      address: this.l2Sdk.teleportGateway.address,
      // keys: [hash.getSelectorFromName("TeleportInitialized")],
      keys: [hash.getSelectorFromName("TeleportInitialized")],
      page_size: 50,
      page_number: 0,
    }

    // @ts-ignore StarknetJs types are wrong
    const { events: newTeleports } = await this.l2Sdk.provider.getEvents(filter)
    console.log(`[${this.syncName}] Found ${newTeleports.length} new teleports`)

    const modelsToCreate: Omit<Teleport, 'id'>[] = newTeleports.map((w: any) => {
      const message = defaultAbiCoder.encode(
        ["bytes32", "bytes32", "bytes32", "bytes32", "uint128", "uint80", "uint48"],
        [
          toL1String(w.data[0]),
          toL1String(w.data[1]),
          toBytes32(w.data[2]),
          toBytes32(w.data[3]),
          ...w.data.slice(4),
        ],
      )
      const teleportHash = keccak256(message)
      return {
        hash: teleportHash,
        sourceDomain: parseBytes32String(toL1String(w.data[0])),
        targetDomain: parseBytes32String(toL1String(w.data[1])),
        amount: w.data[4].toString(),
        nonce: w.data[5].toString(),
        operator: toBytes32(w.data[2]),
        receiver: toBytes32(w.data[3]),
        timestamp: new Date(parseInt(w.data[6])* 1000),
      }
    })

    return (tx: TxHandle) => this.teleportRepository.createMany(modelsToCreate, tx)
  }
}
