import { useEffect, useState } from 'react'
import { useActiveWeb3React } from './web3'
import { Contract } from '@ethersproject/contracts'
import { useBlockNumber } from 'state/application/hooks'
import { Lending_factor } from '../constants/misc'


export function useGetAccountSupplyData(Contract__LendingData: Contract, addr__Pool: string) {
  const { account } = useActiveWeb3React()
  const [accountSupplyData, setAccountSupplyData] = useState()
  const [accountTotalValue, setAccountTotalValue] = useState()
  const latestBlockNumber = useBlockNumber()

  useEffect(() => {
    try {
      //   Token Supplied (uint256)  // accountSupplyData[0]
      //   Token Balance (uint256)  //  accountSupplyData[1]
      //   account Max Supply (uint256)  //  accountSupplyData[2]

      //   Available to Withdraw (uint256)  // accountSupplyData[3]
      //   SAFE MAX Withdraw (uint256)  // accountSupplyData[4]
      //   DLToken Balance (uint256)  // accountSupplyData[5]
      //   Decimals (uint256)  // accountSupplyData[6]
      Contract__LendingData.callStatic.getAccountSupplyData(addr__Pool, account, Lending_factor)
        .then((res: any) => {
          // console.log('get Account Supply Data')
          return setAccountSupplyData(res)
        })

      //   Supply Balance ($) (uint256)  //  accountTotalValue[0]
      //   Collateral Balance ($) (uint256)  //  accountTotalValue[1]
      //   Borrow Balance ($) (uint256)  //  accountTotalValue[2]
      //   Collateralization ratio (%) (uint256)  //  accountTotalValue[3]
      Contract__LendingData.callStatic.getAccountTotalValue(account)
        .then((res: any) => {
          // console.log('get Account Supply Data')
          return setAccountTotalValue(res)
        })
    } catch (err) {
      console.log(err)
    }
  }, [account, Contract__LendingData, latestBlockNumber, addr__Pool])

  return [accountSupplyData, accountTotalValue]
}
