import { providers } from 'ethers'
import { Provider } from 'starknet'

import * as sdks from './sdk'
import { GoerliSdk } from './sdk'
import { StarknetGoerliSdk } from './starknetSdk'
import * as starknetSdks from './starknetSdk/index'

export type L1Sdk = GoerliSdk 
export type L2Sdk = StarknetGoerliSdk 

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
