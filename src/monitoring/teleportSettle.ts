import { SettleRepository } from "../peripherals/db/SettleRepository";
import { L1Sdk } from "../sdks";
import { l1String } from "../utils";

export async function monitorTeleportSettle(
  l1Sdk: L1Sdk,
  settleRepository: SettleRepository,
  sourceDomain: string,
  targetDomain: string
): Promise<{ sinceLastSettle: number; debtToSettle: string }> {
  const currentTimestamp = new Date().getTime();
  const lastSettle = await settleRepository.findLatest(
    sourceDomain,
    targetDomain
  );

  return {
    sinceLastSettle: lastSettle
      ? currentTimestamp - lastSettle.timestamp.getTime()
      : +Infinity,
    debtToSettle: (await l1Sdk.join.debt(l1String(sourceDomain))).toString(),
  };
}
