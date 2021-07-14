import { TransactionResponse } from '@ethersproject/providers'
import { useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
// import { useActiveWeb3React } from './web3'
import { Contract } from '@ethersproject/contracts'




export function useRepayCallback(iMSDContract?: Contract | null) {
  const addTransaction = useTransactionAdder()
  // const { account } = useActiveWeb3React()

  const repay = useCallback(async (amount?: string): Promise<void> => {
    if (!iMSDContract) {
      return console.error('iTokenContract is null')
    }
    if (!amount) {
      return console.error('no spender')
    }


    return iMSDContract.repayBorrow(amount)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'repay USX',
          approval: { tokenAddress: iMSDContract.address, spender: 'account' },
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [iMSDContract, addTransaction])

  return repay
}