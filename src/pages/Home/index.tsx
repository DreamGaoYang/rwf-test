// import { SwitchLocaleLink } from 'components/SwitchLocaleLink'
import SupplyMint from './SupplyMint'
import Borrow from './Borrow'

import { HeaderWrap, PoolName, PoolAPY, PoolAboutUsers, PoolDetail, Title, Title__sub } from './styled'


export default function Home() {

  return (
    <>
      {/* <SwitchLocaleLink /> */}

      <Title>Tinlake is an open market place of real-world asset pools</Title>

      <Title__sub>Tinlake is an open market place of asset pools bringing together Asset Originators and Investors that seek to utilize the full potential of Decentralized Finance (DeFi). Asset Originators can responsibly bridge real-world assets into DeFi and access bankless liquidity.</Title__sub>

      <HeaderWrap>
        <PoolName>Pool</PoolName>
        <PoolAPY>APY</PoolAPY>
        <PoolAboutUsers>Your Outstanding Loan</PoolAboutUsers>
        <PoolDetail />
      </HeaderWrap>

      <SupplyMint />
      <Borrow />
    </>
  )
}

