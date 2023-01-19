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
      '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9',
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

export type StarknetMainnetSdk = ReturnType<typeof getStarknetMainnetSdk>
export function getStarknetMainnetSdk(defaultAccountOrProvider: Account | Provider): {
  provider: RpcProvider
  dai: types.dai
  teleportGateway: types.l2_dai_teleport_gateway
} {
  return {
    provider: defaultAccountOrProvider['provider'],
    dai: getContract(
      '0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3',
      starknetGoerliDaiAbi,
      defaultAccountOrProvider,
    ),
    teleportGateway: getContract(
      '0x05b20d8c7b85456c07bdb8eaaeab52a6bf3770a586af6da8d3f5071ef0dcf234',
      starknetGoerliTeleportGatewayAbi,
      defaultAccountOrProvider,
    ),
  }
}
