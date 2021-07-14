import { TransactionResponse } from '@ethersproject/providers'
import { useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
// import { useActiveWeb3React } from './web3'
import { Contract } from '@ethersproject/contracts'




export function useBorrowCallback(iMSDContract?: Contract | null) {
  const addTransaction = useTransactionAdder()
  // const { account } = useActiveWeb3React()

  const borrow = useCallback(async (amount?: string): Promise<void> => {
    if (!iMSDContract) {
      return console.error('iTokenContract is null')
    }
    if (!amount) {
      return console.error('no spender')
    }


    return iMSDContract.borrow(amount)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'borrow USX',
          approval: { tokenAddress: iMSDContract.address, spender: 'account' },
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [iMSDContract, addTransaction])

  return borrow
}