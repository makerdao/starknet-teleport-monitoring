const contracts = [];
const Name = '';
const name = '';

const contractTypes = contracts.map(contract => {
  return `
export type { ${contract} } from "./${name}/${contract};
export { ${contract}__factory } from "./factories/${name}/${contract}__factory";`
}).join("\n");

const typesIndex = `
import type * as ${name} from "./goerli";
export type { ${name} };
export * as factories from "./factories";
${contractTypes}`;

const index = `
import { Provider, Signer } from 'starknet';
import * as types from './types';
export declare function getContract(address: string, abi: object, defaultSignerOrProvider: Signer | Provider): any;
export declare type ${Name}Sdk = ReturnType<typeof get${Name}Sdk>;
export declare function get${Name}Sdk(defaultSignerOrProvider: Signer | Provider): {
    ${contracts}
};`;
