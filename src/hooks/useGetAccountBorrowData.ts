import { useEffect, useState } from 'react'
import { useActiveWeb3React } from './web3'
import { Contract } from '@ethersproject/contracts'
import { useBlockNumber } from 'state/application/hooks'
import { Lending_factor } from '../constants/misc'


export function useGetAccountBorrowData(Contract__LendingData: Contract, addr__Pool: string) {
  const { account } = useActiveWeb3React()
  const [accountBorrowData, setAccountBorrowData] = useState()
  const [borrowTokenData, setBorrowTokenData] = useState()
  const latestBlockNumber = useBlockNumber()

  useEffect(() => {
    try {
      // Token Borrowed (uint256)  // accountBorrowData[0]
      // Available to Borrow (uint256) ====> update to Cap(市场可借数量)  // accountBorrowData[1]
      // SAFE MAX Available to Borrow (uint256)  // accountBorrowData[2]
      // Token Balance (uint256)  //  accountBorrowData[3]
      // Max BURN (uint256)  //  accountBorrowData[4]
      // Decimals (uint8)  // accountBorrowData[5]
      Contract__LendingData.callStatic.getAccountBorrowData(addr__Pool, account, Lending_factor)
        .then((res: any) => {
          // console.log('get Account Borrow Data')
          return setAccountBorrowData(res)
        })

      // Liquidity (uint256)(scaled by 10**Decimals)  //  borrowTokenData[0]    已经改成 borrowed
      // Borrow Cap (uint256)  //  borrowTokenData[1]
      // Borrow APY (uint256) //  borrowTokenData[2]
      // Token Price (uint256) //  borrowTokenData[3]
      Contract__LendingData.callStatic.getBorrowTokenData(addr__Pool)
        .then((res: any) => {
          // console.log('get Account Borrow Data')
          return setBorrowTokenData(res)
        })
    } catch (err) {
      console.log(err)
    }
  }, [account, Contract__LendingData, latestBlockNumber, addr__Pool])

  return [accountBorrowData, borrowTokenData]
}
