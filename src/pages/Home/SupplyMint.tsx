import { useState, useEffect } from 'react'
import { Trans } from '@lingui/macro'
// import { BigNumber } from 'ethers'
import BigNumber from "bignumber.js";
import { Contract } from '@ethersproject/contracts'

import { useActiveWeb3React } from '../../hooks/web3'
import { usePoolContract, useTokenContract, useLendingDataContract } from '../../hooks/useContract'
import { useAllowance } from '../../hooks/useTokenAllowance'
import { useApprovingCallback } from '../../hooks/useApproveCallback'
import { useGetAccountSupplyData } from '../../hooks/useGetAccountSupplyData'
import { useGetAccountBorrowData } from '../../hooks/useGetAccountBorrowData'

import { useSupplyCallback } from '../../hooks/useSupplyCallback'
import { useWithdrawCallback } from '../../hooks/useWithdrawCallback'
import { useBorrowCallback } from '../../hooks/useBorrowCallback'
import { useRepayCallback } from '../../hooks/useRepayCallback'

import { useWindowSize } from '../../hooks/useWindowSize'

import { format_bn, format_num_to_K } from '../../utils'

import detail_up from '../../assets/svg/detail-up.svg'
import test_A from '../../assets/images/test-A.jpg'
import right_up from '../../assets/svg/right-up.svg'
import img_USDC from '../../assets/svg/USDC.svg'
import img_USX from '../../assets/svg/USX.svg'


import {
  MainBody,
  Card_wrap,
  Styled_Btn,
  Input_wrap,
  EnableFirst,
  StyledInput,
  StyledMAX,
  Key__and__Value,
  Key,
  Key__icon,
  Key__text,
  Available_Balance,
  OperationCard,
  Tab__wrap,
  Tab,
  DetailInfo,
  Item,
  Item__title,
  Item__value,
  Header,
  PoolName,
  PoolAPY,
  PoolAboutUsers,
  PoolDetail,
  PoolItem,
  ListWrap,
  Details_Links,
  Details_Links__title,
  Details_Links__title__sub,
  Links,
  SingleLink,
  SingleLinkOpen
} from './styled'




export default function SupplyMint() {
  const { account } = useActiveWeb3React()
  const windowSize = useWindowSize()
  // console.log(windowSize)


  const [curTab__supply, setCurTab__supply] = useState<boolean>(true)
  const [curTab__mint, setCurTab__mint] = useState<boolean>(true)

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [height, setHeight] = useState<string>('0')

  const [value__supply, setValue__supply] = useState<string>('')
  const [value__withdraw, setValue__withdraw] = useState<string>('')
  const [value__borrow, setValue__borrow] = useState<string>('')
  const [value__repay, setValue__repay] = useState<string>('')
  const [value__supply__max, setValue__supply__max] = useState<boolean>(false)
  const [value__withdraw__max, setValue__withdraw__max] = useState<boolean>(false)
  const [value__borrow__max, setValue__borrow__max] = useState<boolean>(false)
  const [value__repay__max, setValue__repay__max] = useState<boolean>(false)


  const addr__LendingData = '0x779cc20B0BB9CeF0AeF90f0a2bdc8D71A5eD4859'
  const addr__iToken = '0x5021abE0E7d6ce8bdB3F6E01EA0b99E4EfE29174'
  const addr__iMSDToken = '0x218B7375c788B91d9D0ad10080E7CD191f093369'

  const addr__USDC = '0x11513151a77fE2Bc43fdEdeACE05c4F35ff81A8f'
  const addr__USX = '0xF76eAd4da04BbeB97d29F83e2Ec3a621d0FB3c6e'


  const Contract__LendingData: any = useLendingDataContract(addr__LendingData)
  const Contract__iToken: any = usePoolContract(addr__iToken)
  const Contract__iMSDToken: any = usePoolContract(addr__iMSDToken)

  const Contract__USDC: any = useTokenContract(addr__USDC)
  const Contract__USX: any = useTokenContract(addr__USX)



  const allowance__USDC = useAllowance(Contract__USDC, account || undefined, addr__iToken)
  const allowance__USX = useAllowance(Contract__USX, account || undefined, addr__iMSDToken)
  // console.log('allowance__USDC: ', allowance__USDC)
  // console.log('allowance__USX: ', allowance__USX)




  const [accountSupplyData, accountTotalValue]: any = useGetAccountSupplyData(Contract__LendingData, addr__iToken)
  const [accountBorrowData, borrowTokenData]: any = useGetAccountBorrowData(Contract__LendingData, addr__iMSDToken)
  // console.log('accountSupplyData: ', accountSupplyData, accountTotalValue)
  // console.log('accountBorrowData: ', accountBorrowData, borrowTokenData)






  const approveCallback__iToken = useApprovingCallback(addr__iToken)
  const approveCallback__iMSDToken = useApprovingCallback(addr__iMSDToken)


  async function onAttemptToApprove(tokenContract: Contract, iTokenOpts?: boolean) {
    try {
      if (iTokenOpts) {
        await approveCallback__iToken(tokenContract)
      } else {
        approveCallback__iMSDToken(tokenContract)
      }
    } catch (error) {
      console.log(error)
    }
  }





  const supply = useSupplyCallback(Contract__iToken)
  const withdraw = useWithdrawCallback(Contract__iToken)
  const borrow = useBorrowCallback(Contract__iMSDToken)
  const repay = useRepayCallback(Contract__iMSDToken)


  /**
   * inputs MAX
  **/
  const supply__max = () => {
    setValue__supply__max(true)
    const toShow = format_bn(accountSupplyData[1].toString(), accountSupplyData[6].toString(), 4)
    setValue__supply(toShow)
  }
  const withdraw__max = () => {
    setValue__withdraw__max(true)
    const toShow = format_bn(accountSupplyData[4].toString(), accountSupplyData[6].toString(), 4)
    setValue__withdraw(toShow)
  }
  const borrow__max = () => {
    setValue__borrow__max(true)
    const toShow = format_bn(accountBorrowData[2].toString(), accountBorrowData[5].toString(), 4)
    setValue__borrow(toShow)
  }
  const repay__max = () => {
    setValue__repay__max(true)
    const toShow = format_bn(accountBorrowData[4].toString(), accountBorrowData[5].toString(), 4)
    setValue__repay(toShow)
  }


  /**
   * inputs changed
  **/
  const supply__change = (value: string) => {
    if (value.includes('.') && value.slice(value.indexOf('.')).length > 5) {
      // console.log(value.slice(value.indexOf('.')).length)
      return
    }
    setValue__supply__max(false)
    setValue__supply(value)
  }
  const withdraw__change = (value: string) => {
    if (value.includes('.') && value.slice(value.indexOf('.')).length > 5) {
      return
    }
    setValue__withdraw__max(false)
    setValue__withdraw(value)
  }
  const borrow__change = (value: string) => {
    if (value.includes('.') && value.slice(value.indexOf('.')).length > 5) {
      return
    }
    setValue__borrow__max(false)
    setValue__borrow(value)
  }
  const repay__change = (value: string) => {
    if (value.includes('.') && value.slice(value.indexOf('.')).length > 5) {
      return
    }
    setValue__repay__max(false)
    setValue__repay(value)
  }


  /**
   * 4个操作:
   *  supply withdraw  mint burn
  **/
  async function onAttemptToSupply() {
    try {
      // console.log(value__supply)
      const bnToString = value__supply__max ?
        accountSupplyData[1].toString()
        :
        new BigNumber(value__supply)
          .multipliedBy(new BigNumber(10).pow(new BigNumber(accountSupplyData[6].toString())))
          .toString()
      console.log(bnToString)
      await supply(bnToString)
      setValue__supply('')
    } catch (error) {
      console.log(error)
    }
  }
  async function onAttemptToWithdraw() {
    try {
      // console.log(value__withdraw)
      const bnToString = new BigNumber(value__withdraw)
        .multipliedBy(new BigNumber(10).pow(new BigNumber(accountSupplyData[6].toString())))
        .toString()
      const is_equal =
        accountSupplyData[0] === accountSupplyData[3] &&
        accountSupplyData[0] === accountSupplyData[4] &&
        accountSupplyData[3] === accountSupplyData[4]

      await withdraw(
        value__withdraw__max ?
          is_equal ? accountSupplyData[5].toString() : accountSupplyData[4].toString()
          :
          bnToString,
        value__withdraw__max ?
          is_equal ? "redeem" : "redeemUnderlying"
          :
          "redeemUnderlying"
      )
      setValue__withdraw('')
    } catch (error) {
      console.log(error)
    }
  }
  async function onAttemptToBorrow() {
    try {
      // console.log(value__borrow)
      const bnToString = value__borrow__max ?
        accountBorrowData[2].toString()
        :
        new BigNumber(value__borrow)
          .multipliedBy(new BigNumber(10).pow(new BigNumber(accountBorrowData[5].toString())))
          .toString()
      console.log(bnToString)
      await borrow(bnToString)
      setValue__borrow('')
    } catch (error) {
      console.log(error)
    }
  }
  async function onAttemptToRepay() {
    try {
      // console.log(value__repay)
      const bnToString = value__repay__max ?
        accountBorrowData[4].toString()
        :
        new BigNumber(value__repay)
          .multipliedBy(new BigNumber(10).pow(new BigNumber(accountBorrowData[5].toString())))
          .toString()
      // console.log(bnToString)
      await repay(bnToString)
      setValue__repay('')
    } catch (error) {
      console.log(error)
    }
  }













  useEffect(() => {
    const cur_height = document.getElementById('height')?.scrollHeight
    setHeight(cur_height?.toString() ?? '0')
    // console.log(cur_height)
  }, [windowSize])


  return (
    <>
      <ListWrap>
        <PoolItem>
          <Header onClick={() => { setIsOpenDetail(!isOpenDetail) }}>
            <PoolName>
              <img src={test_A} alt="" />
              <Trans>Loan A</Trans>
            </PoolName>
            <PoolAPY>{
              borrowTokenData ?
                format_bn(borrowTokenData[2].toString(), 16, 2) + '%' : '...'
            }</PoolAPY>
            <PoolAboutUsers>
              {
                accountBorrowData && borrowTokenData ?
                  '$' + format_num_to_K(format_bn(
                    new BigNumber(accountBorrowData[0].toString())
                      .multipliedBy(new BigNumber(borrowTokenData[3].toString()))
                      .div(new BigNumber(10).pow(new BigNumber(18)))
                      .toString(), accountBorrowData[5].toString(), 2
                  ))
                  :
                  '...'
              }
            </PoolAboutUsers>
            <PoolDetail isOpenDetail={isOpenDetail}>
              <span>Detail</span>
              <img src={detail_up} alt="" />
            </PoolDetail>
          </Header>

          <MainBody height={height} isOpenDetail={isOpenDetail} id='height'>
            <Card_wrap>
              {/* 左侧信息栏 */}
              <DetailInfo>
                <Item>
                  <Item__title>Collateral Balance</Item__title>
                  <Item__value>{
                    accountTotalValue ?
                      '$' + format_num_to_K(format_bn(accountTotalValue[1].toString(), 18, 2)) : '...'
                  }</Item__value>
                </Item>
                <Item>
                  <Item__title>Collateral Ratio</Item__title>
                  <Item__value>{
                    accountTotalValue ?
                      format_bn(accountTotalValue[3].toString(), 18, 2) : '...'
                  }</Item__value>
                </Item>
                <Item>
                  <Item__title>Borrow Cap</Item__title>
                  <Item__value>{
                    borrowTokenData && accountBorrowData ?
                      format_num_to_K(format_bn(borrowTokenData[1].toString(), accountBorrowData[5].toString(), 2)) : '...'
                  }</Item__value>
                </Item>
                <Item>
                  <Item__title>Asset maturity</Item__title>
                  <Item__value>{'12 Months'}</Item__value>
                </Item>
                <Item>
                  <Item__title>End Time</Item__title>
                  <Item__value>{'2022/12/12 12:00 '}</Item__value>
                </Item>
                <Item>
                  <Item__title>Current APY</Item__title>
                  <Item__value>{
                    borrowTokenData ?
                      format_bn(borrowTokenData[2].toString(), 16, 2) + '%' : '...'
                  }</Item__value>
                </Item>
                <Item>
                  <Item__title>After Date APY</Item__title>
                  <Item__value>{'15.00%'}</Item__value>
                </Item>


              </DetailInfo>
              {/* supply 存款栏 */}
              <OperationCard>
                <Tab__wrap>
                  <Tab type='supply' className={curTab__supply ? 'active' : ''} onClick={() => { setCurTab__supply(true) }}>
                    SUPPLY
                  </Tab>
                  <Tab type='supply' className={!curTab__supply ? 'active' : ''} onClick={() => { setCurTab__supply(false) }}>
                    WITHDRAW
                  </Tab>
                </Tab__wrap>
                {
                  curTab__supply ?
                    <>
                      <Key__and__Value>
                        <Key>
                          <Key__icon>
                            <img src={img_USDC} alt="" />
                          </Key__icon>
                          <Key__text>USDC Balance</Key__text>
                        </Key>
                        <Available_Balance>
                          {
                            accountSupplyData ?
                              format_num_to_K(format_bn(accountSupplyData[1].toString(), accountSupplyData[6].toString(), 2))
                              :
                              '...'
                          }
                        </Available_Balance>
                      </Key__and__Value>
                      {
                        allowance__USDC && new BigNumber(allowance__USDC).gt(new BigNumber(0)) &&
                        <>
                          <Input_wrap>
                            <StyledInput
                              type="number"
                              pattern="^[0-9]*[.,]?[0-9]*$"
                              placeholder='Amount'
                              value={value__supply}
                              onChange={(e) => { supply__change(e.target.value) }}
                            />
                            <StyledMAX type='supply' onClick={supply__max}>MAX</StyledMAX>
                          </Input_wrap>
                          <Styled_Btn
                            type='supply'
                            onClick={onAttemptToSupply}>
                            SUPPLY
                          </Styled_Btn>
                        </>
                      }
                      {
                        !(allowance__USDC && new BigNumber(allowance__USDC).gt(new BigNumber(0))) &&
                        <>
                          <EnableFirst>You must enable OST before supplying for the first time.</EnableFirst>
                          <Styled_Btn type='supply' onClick={() => { onAttemptToApprove(Contract__USDC, true) }}>ENABLE</Styled_Btn>
                        </>
                      }
                    </>
                    :
                    <>
                      <Key__and__Value>
                        <Key>
                          <Key__icon>
                            <img src={img_USDC} alt="" />
                          </Key__icon>
                          <Key__text>Available to Withdraw</Key__text>
                        </Key>
                        <Available_Balance>
                          {
                            accountSupplyData ?
                              format_num_to_K(format_bn(accountSupplyData[4].toString(), accountSupplyData[6].toString(), 2))
                              :
                              '...'
                          }
                        </Available_Balance>
                      </Key__and__Value>
                      <Input_wrap>
                        <StyledInput
                          type="number"
                          pattern="^[0-9]*[.,]?[0-9]*$"
                          placeholder='Amount'
                          value={value__withdraw}
                          onChange={(e) => { withdraw__change(e.target.value) }}
                        />
                        <StyledMAX type='supply' onClick={withdraw__max}>MAX</StyledMAX>
                      </Input_wrap>
                      <Styled_Btn
                        type='supply'
                        onClick={onAttemptToWithdraw}>
                        WITHDRAW
                      </Styled_Btn>
                    </>
                }
              </OperationCard>
              {/* mint 铸币栏 */}
              <OperationCard>
                <Tab__wrap>
                  <Tab type='mint' className={curTab__mint ? 'active' : ''} onClick={() => { setCurTab__mint(true) }}>
                    MINT
                  </Tab>
                  <Tab type='mint' className={!curTab__mint ? 'active' : ''} onClick={() => { setCurTab__mint(false) }}>
                    BURN
                  </Tab>
                </Tab__wrap>
                {
                  curTab__mint ?
                    <>
                      <Key__and__Value>
                        <Key>
                          <Key__icon>
                            <img src={img_USX} alt="" />
                          </Key__icon>
                          <Key__text>Available to Mint</Key__text>
                        </Key>
                        <Available_Balance>
                          {
                            accountBorrowData ?
                              format_num_to_K(format_bn(accountBorrowData[2].toString(), accountBorrowData[5].toString(), 2))
                              :
                              '...'
                          }
                        </Available_Balance>
                      </Key__and__Value>
                      <Input_wrap>
                        <StyledInput
                          type="number"
                          pattern="^[0-9]*[.,]?[0-9]*$"
                          placeholder='Amount'
                          value={value__borrow}
                          onChange={(e) => { borrow__change(e.target.value) }}
                        />
                        <StyledMAX type='mint' onClick={borrow__max}>MAX</StyledMAX>
                      </Input_wrap>
                      <Styled_Btn type='mint'
                        onClick={onAttemptToBorrow}>
                        MINT
                      </Styled_Btn>
                    </>
                    :
                    <>
                      <Key__and__Value>
                        <Key>
                          <Key__icon>
                            <img src={img_USX} alt="" />
                          </Key__icon>
                          <Key__text>USX Balance</Key__text>
                        </Key>
                        <Available_Balance>
                          {
                            accountBorrowData ?
                              format_num_to_K(format_bn(accountBorrowData[3].toString(), accountBorrowData[5].toString(), 2))
                              :
                              '...'
                          }
                        </Available_Balance>
                      </Key__and__Value>
                      {
                        allowance__USX && new BigNumber(allowance__USX).gt(new BigNumber(0)) &&
                        <>
                          <Input_wrap>
                            <StyledInput
                              type="number"
                              pattern="^[0-9]*[.,]?[0-9]*$"
                              placeholder='Amount'
                              value={value__repay}
                              onChange={(e) => { repay__change(e.target.value) }}
                            />
                            <StyledMAX type='mint' onClick={repay__max}>MAX</StyledMAX>
                          </Input_wrap>
                          <Styled_Btn type='mint'
                            onClick={onAttemptToRepay}>
                            BURN
                          </Styled_Btn></>
                      }
                      {
                        !(allowance__USX && new BigNumber(allowance__USX).gt(new BigNumber(0))) &&
                        <>
                          <EnableFirst>You must enable USX before supplying for the first time.</EnableFirst>
                          <Styled_Btn type='mint' onClick={() => { onAttemptToApprove(Contract__USX) }}>ENABLE</Styled_Btn>
                        </>
                      }
                    </>
                }
              </OperationCard>
            </Card_wrap>

            <Details_Links>
              <Details_Links__title>Asset Originator Details</Details_Links__title>
              <Details_Links__title__sub>Founded in 2018, New Silver is a technology enabled non-bank lender primarily focused on providing real estate-backed financing for the United States “fix and flip” sector with a concentration on single-family residential assets. Bridge loans, also referred to as fix and flip loans allow real estate investors to finance both the purchase and the construction, or in some cases, refinance an existing investment property with sufficient equity. This Tinlake pool is financing a portfolio of real estate bridge loans that are extended to real estate developers with a maturity of twelve to twenty four months.</Details_Links__title__sub>
              <Links>
                <SingleLink>Links</SingleLink>
                <SingleLinkOpen>
                  <span>Asset Originator Details</span>
                  <img src={right_up} alt="" />
                </SingleLinkOpen>
                <SingleLinkOpen>
                  <span>Asset Originator Details</span>
                  <img src={right_up} alt="" />
                </SingleLinkOpen>
                <SingleLinkOpen>
                  <span>Asset Originator Details</span>
                  <img src={right_up} alt="" />
                </SingleLinkOpen>
              </Links>
            </Details_Links>
          </MainBody>
        </PoolItem>
      </ListWrap>
    </>
  )
}
