import { TransactionResponse } from '@ethersproject/providers'
import { useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useActiveWeb3React } from './web3'
import { Contract } from '@ethersproject/contracts'



// mintAndEnterMarket
export function useSupplyCallback(iTokenContract?: Contract | null) {
  const addTransaction = useTransactionAdder()
  const { account } = useActiveWeb3React()

  const supply = useCallback(async (amount?: string): Promise<void> => {
    if (!iTokenContract) {
      return console.error('iTokenContract is null')
    }
    if (!amount) {
      return console.error('no spender')
    }


    return iTokenContract.mintAndEnterMarket(account, amount)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'supply USDC',
          approval: { tokenAddress: iTokenContract.address, spender: 'account' },
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [account, iTokenContract, addTransaction])

  return supply
}