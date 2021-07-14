import { useEffect, useState } from 'react'
import { useActiveWeb3React } from './web3'
import { Contract } from '@ethersproject/contracts'

import { useBlockNumber } from 'state/application/hooks'


export function useBalanceOf(tokenContract: Contract) {
  const { account } = useActiveWeb3React()
  const [balance, setBalance] = useState('')
  const latestBlockNumber = useBlockNumber()

  useEffect(() => {
    tokenContract.balanceOf(account)
      .then((res: any) => {
        console.log('------useEffect------')
        return setBalance(res.toString())
      })
  }, [account, tokenContract, latestBlockNumber])

  return balance
}



// const latestBlockNumber = useBlockNumber()
// import JSBI from 'jsbi'
// import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
// import { useSocksController } from './useContract'

// export function useBalanceOf(tokenContract: Contract) {
//   const { account } = useActiveWeb3React()
//   // const socksContract = useSocksController()

//   const inputs = useMemo(() => [account ?? undefined], [account])
//   const { result } = useSingleCallResult(tokenContract, 'balanceOf', inputs, NEVER_RELOAD)
//   const data = result?.[0]
//   return data ? data.toString() : undefined
// }

