import { providers } from 'ethers'
import { Provider } from 'starknet'

import * as sdks from './sdk'
import { GoerliSdk, MainnetSdk } from './sdk'
import { StarknetGoerliSdk, StarknetMainnetSdk } from './starknetSdk'
import * as starknetSdks from './starknetSdk/index'

export type L1Sdk = GoerliSdk | MainnetSdk
export type L2Sdk = StarknetGoerliSdk | StarknetMainnetSdk

export function getL1SdkBasedOnNetworkName(sdkName: string, provider: providers.Provider): L1Sdk {
  const SDK = (sdks as any)[`get${sdkName}Sdk`]

  if (!SDK) {
    throw new Error(`Can't find SDK for network ${sdkName}`)
  }

  return SDK(provider)
}

export function getL2SdkBasedOnNetworkName(sdkName: string, provider: Provider): L2Sdk {
  const SDK = (starknetSdks as any)[`get${sdkName}Sdk`]

  if (!SDK) {
    throw new Error(`Can't find SDK for network ${sdkName}`)
  }

  return SDK(provider)
}
