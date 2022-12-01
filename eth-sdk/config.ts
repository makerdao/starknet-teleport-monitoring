import { defineConfig } from '@dethcrypto/eth-sdk'
import { join } from 'path'

export default defineConfig({
  contracts: {
    goerli: {
      dai: '0xd7F24C609825a4348dEc3C856Aa8796696355Fcd',
      escrow: '0x39FE883fC4b7966ccbff49094e28E665A0A67E3b',
      join: '0x3e55b205760829Ff478191FfEAA3C542F982C096',
      oracleAuth: '0x29d292E0773E484dbcA8626F432985630175763b',
    },
    mainnet: {
      dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      escrow: '0x0437465dfb5B79726e35F08559B0cBea55bb585C',
      join: '0x41Ca7a7Aa2Be78Cf7CB80C0F4a9bdfBC96e81815',
      oracleAuth: '0x324a895625E7AE38Fc7A6ae91a71e7E937Caa7e6',
    },
    /*
    starknetGoerli: {
      dai: '0x01903dbcb51945b5c4dffba0ff79b30644df4627c27d8ab0fc4ae07f6dbd18e9',
      teleportGateway: '0x03236409bbcd10f29d56cbe270e383d865e71837959cea7127611d4890bb46d9',
    },
    */
  },
  outputPath: join(__dirname, '../src/sdk'),
})
