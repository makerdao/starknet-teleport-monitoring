import { Account, Contract, Provider, RpcProvider } from 'starknet'

import starknetGoerliDaiAbi from '../../eth-sdk/starknetAbis/dai.json'
import starknetGoerliTeleportGatewayAbi from '../../eth-sdk/starknetAbis/l2_dai_teleport_gateway.json'
import * as types from './types'
export function getContract(address: string, abi: any, defaultAccountOrProvider: Account | Provider): any {
  return new Contract(abi, address, defaultAccountOrProvider)
}
export type StarknetGoerliSdk = ReturnType<typeof getStarknetGoerliSdk>
export function getStarknetGoerliSdk(defaultAccountOrProvider: Account | Provider): {
  provider: RpcProvider
  dai: types.dai
  teleportGateway: types.l2_dai_teleport_gateway
} {
  return {
    provider: defaultAccountOrProvider['provider'],
    dai: getContract(
      '0x01903dbcb51945b5c4dffba0ff79b30644df4627c27d8ab0fc4ae07f6dbd18e9',
      starknetGoerliDaiAbi,
      defaultAccountOrProvider,
    ),
    teleportGateway: getContract(
      '0x078e1e7cc88114fe71be7433d1323782b4586c532a1868f072fc44ce9abf6714',
      starknetGoerliTeleportGatewayAbi,
      defaultAccountOrProvider,
    ),
  }
}
