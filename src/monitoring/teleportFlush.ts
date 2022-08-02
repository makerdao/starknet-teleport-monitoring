import { FlushRepository } from '../peripherals/db/FlushRepository'
import { L2Sdk } from '../sdks'
import { l2String } from '../utils'

export async function monitorTeleportFlush(
  l2Sdk: L2Sdk,
  flushRepository: FlushRepository,
  sourceDomain: string,
  targetDomain: string,
): Promise<{ sinceLastFlush: number; debtToFlush: string }> {
  const currentTimestamp = new Date().getTime()
  const lastFlush = await flushRepository.findLatest(sourceDomain, targetDomain)
  const { res: _debtToFlush } = await l2Sdk.teleportGateway.batched_dai_to_flush(l2String(targetDomain))
  const debtToFlush = `0x${_debtToFlush.high.toString(16)}${_debtToFlush.low.toString(16)}`
  return {
    sinceLastFlush: lastFlush ? currentTimestamp - lastFlush.timestamp.getTime() : +Infinity,
    debtToFlush,
  }
}
