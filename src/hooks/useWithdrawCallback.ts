import { TransactionResponse } from '@ethersproject/providers'
import { useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useActiveWeb3React } from './web3'
import { Contract } from '@ethersproject/contracts'




export function useWithdrawCallback(iTokenContract?: Contract | null) {
  const addTransaction = useTransactionAdder()
  const { account } = useActiveWeb3React()

  const withdraw = useCallback(async (amount?: string, methods?: any): Promise<void> => {
    if (!iTokenContract) {
      return console.error('iTokenContract is null')
    }
    if (!amount) {
      return console.error('no spender')
    }


    return iTokenContract[methods](account, amount)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'withdraw USDC',
          approval: { tokenAddress: iTokenContract.address, spender: 'account' },
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to withdraw token', error)
        throw error
      })
  }, [account, iTokenContract, addTransaction])

  return withdraw
}