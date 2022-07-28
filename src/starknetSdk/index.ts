import { Provider, Contract, Account } from 'starknet';
import * as types from './types';

import starknetGoerliDaiAbi from '../../eth-sdk/starknetAbis/dai.json';
import starknetGoerliTeleportGatewayAbi from '../../eth-sdk/starknetAbis/l2_dai_teleport_gateway.json';
export function getContract(address: string, abi: any, defaultAccountOrProvider: Account | Provider): any {
    return new Contract(abi, address, defaultAccountOrProvider);
}
export type StarknetGoerliSdk = ReturnType<typeof getStarknetGoerliSdk>;
export function getStarknetGoerliSdk(defaultAccountOrProvider: Account | Provider): {
    provider: Provider,
    dai: types.dai;
    teleportGateway: types.l2_dai_teleport_gateway;
} {
    return {
        "provider": defaultAccountOrProvider,
        "dai": getContract('0x01903dbcb51945b5c4dffba0ff79b30644df4627c27d8ab0fc4ae07f6dbd18e9', starknetGoerliDaiAbi, defaultAccountOrProvider),
        "teleportGateway": getContract('0x03236409bbcd10f29d56cbe270e383d865e71837959cea7127611d4890bb46d9', starknetGoerliTeleportGatewayAbi, defaultAccountOrProvider),
    };
}
