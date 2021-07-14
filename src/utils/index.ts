import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk/dist/'
import { TokenAddressMap } from '../state/lists/hooks'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// 标记 实例化合约
// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(tokenAddressMap: TokenAddressMap, token?: Token): boolean {
  return Boolean(token?.isToken && tokenAddressMap[token.chainId]?.[token.address])
}

export function formattedFeeAmount(feeAmount: FeeAmount): number {
  return feeAmount / 10000
}


export const format_bn = (numStr: string, decimals: number, decimalPlace = decimals) => {
  numStr = numStr.toLocaleString().replace(/,/g, "");
  // decimals = decimals.toString();

  // var str = (10 ** decimals).toLocaleString().replace(/,/g, '').slice(1);
  const str = Number(`1e+${decimals}`).toLocaleString().replace(/,/g, "").slice(1);

  let res = (
    numStr.length > decimals ?
      numStr.slice(0, numStr.length - decimals) + "." + numStr.slice(numStr.length - decimals)
      :
      "0." + str.slice(0, str.length - numStr.length) + numStr
  )

  res = res.replace(/(0+)$/g, "");

  res = res.slice(-1) === "." ? res + "00" : res;

  if (decimalPlace === 0) return res.slice(0, res.indexOf("."));

  const length = res.indexOf(".") + 1 + decimalPlace;
  return res.slice(0, length >= res.length ? res.length : length);
  // return res.slice(-1) == '.' ? res + '00' : res;
}

export const format_num_to_K = (str_num: string) => {
  let part_a = str_num.split(".")[0];
  const part_b = str_num.split(".")[1];

  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  part_a = (part_a + "").replace(reg, "$&,");

  return part_a + "." + part_b;
}
