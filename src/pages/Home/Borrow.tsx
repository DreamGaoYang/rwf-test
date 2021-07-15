import { useState, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import BigNumber from "bignumber.js";
import { Contract } from '@ethersproject/contracts'

import { useActiveWeb3React } from '../../hooks/web3'
import { usePoolContract, useTokenContract, useLendingDataContract } from '../../hooks/useContract'
import { useAllowance } from '../../hooks/useTokenAllowance'
import { useApprovingCallback } from '../../hooks/useApproveCallback'
import { useGetAccountBorrowData } from '../../hooks/useGetAccountBorrowData'

import { useBorrowCallback } from '../../hooks/useBorrowCallback'
import { useRepayCallback } from '../../hooks/useRepayCallback'

import { format_bn, format_num_to_K } from '../../utils'

import detail_up from '../../assets/svg/detail-up.svg'
import test_A from '../../assets/images/test-A.jpg'
import right_up from '../../assets/svg/right-up.svg'
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
  OperationCard__content,
  Pool__Info,
  DetailInfo__content,
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





export default function Borrow() {
  const { account } = useActiveWeb3React()
  // console.log(account, chainId)


  const [curTab__borrow, setCurTab__borrow] = useState<boolean>(true)

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [height, setHeight] = useState<string>('0')

  const [value__borrow, setValue__borrow] = useState<string>('')
  const [value__repay, setValue__repay] = useState<string>('')
  const [value__borrow__max, setValue__borrow__max] = useState<boolean>(false)
  const [value__repay__max, setValue__repay__max] = useState<boolean>(false)


  const addr__LendingData = '0x4faC2eaEd9eA881613ECE4EBE0816FDbB27f2576'

  const addr__iMSDToken = '0xf4f1177399f0E6227F4E98B5841Dcb0b11fBeb90'

  const addr__USX = '0xF76eAd4da04BbeB97d29F83e2Ec3a621d0FB3c6e'


  const Contract__LendingData: any = useLendingDataContract(addr__LendingData)
  const Contract__iMSDToken: any = usePoolContract(addr__iMSDToken)

  const Contract__USX: any = useTokenContract(addr__USX)



  const allowance__USX = useAllowance(Contract__USX, account || undefined, addr__iMSDToken)
  // console.log('allowance__USX: ', allowance__USX)




  const [accountBorrowData, borrowTokenData]: any = useGetAccountBorrowData(Contract__LendingData, addr__iMSDToken)
  // console.log('accountBorrowData: ', accountBorrowData, borrowTokenData)




  const approveCallback__iMSDToken = useApprovingCallback(addr__iMSDToken)


  async function onAttemptToApprove(tokenContract: Contract) {
    try {
      approveCallback__iMSDToken(tokenContract)
    } catch (error) {
      console.log(error)
    }
  }






  const borrow = useBorrowCallback(Contract__iMSDToken)
  const repay = useRepayCallback(Contract__iMSDToken)


  /**
   * inputs MAX
  **/
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
   * 2个操作:
   *  borrow repay
  **/
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
  }, [])


  return (
    <>
      <ListWrap>
        <PoolItem>
          <Header onClick={() => { setIsOpenDetail(!isOpenDetail) }}>
            <PoolName>
              <img src={test_A} alt="" />
              <Trans>Loan B</Trans>
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
                <Pool__Info>Pool__Info</Pool__Info>
                <DetailInfo__content>
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
                </DetailInfo__content>
              </DetailInfo>
              {/* borrow 借款栏 */}
              <OperationCard>
                <Key__and__Value>
                  <Key>
                    <Key__icon>
                      <img src={img_USX} alt="" />
                    </Key__icon>
                    <Key__text withIcon={true}>USX Borrowed</Key__text>
                  </Key>
                  <Available_Balance withIcon={true} withColor='borrow'>
                    {
                      accountBorrowData ?
                        format_num_to_K(format_bn(accountBorrowData[0].toString(), accountBorrowData[5].toString(), 2))
                        :
                        '...'
                    }
                  </Available_Balance>
                </Key__and__Value>

                <OperationCard__content>
                  <Tab__wrap>
                    <Tab type='borrow' className={curTab__borrow ? 'active' : ''} onClick={() => { setCurTab__borrow(true) }}>
                      BORROW
                    </Tab>
                    <Tab type='borrow' className={!curTab__borrow ? 'active' : ''} onClick={() => { setCurTab__borrow(false) }}>
                      REPAY
                    </Tab>
                  </Tab__wrap>
                  {
                    curTab__borrow ?
                      <>
                        <Key__and__Value>
                          <Key>
                            <Key__text>Available to Borrow</Key__text>
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
                          <StyledMAX type='borrow' onClick={borrow__max}>MAX</StyledMAX>
                        </Input_wrap>
                        <Styled_Btn type='borrow'
                          onClick={onAttemptToBorrow}>
                          BORROW
                        </Styled_Btn>
                      </>
                      :
                      <>
                        <Key__and__Value>
                          <Key>
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
                              <StyledMAX type='borrow' onClick={repay__max}>MAX</StyledMAX>
                            </Input_wrap>
                            <Styled_Btn type='borrow'
                              onClick={onAttemptToRepay}>
                              REPAY
                            </Styled_Btn></>
                        }
                        {
                          !(allowance__USX && new BigNumber(allowance__USX).gt(new BigNumber(0))) &&
                          <>
                            <EnableFirst>You must enable USX before supplying for the first time.</EnableFirst>
                            <Styled_Btn type='borrow' onClick={() => { onAttemptToApprove(Contract__USX) }}>ENABLE</Styled_Btn>
                          </>
                        }
                      </>
                  }
                </OperationCard__content>
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
