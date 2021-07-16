import styled from 'styled-components/macro'


interface MainBodyProps {
  id: string,
  height: any,
  isOpenDetail: boolean,
}
export const MainBody = styled.div<MainBodyProps>`
  height: ${(props) => props.isOpenDetail ? props.height + 'px' : '0px'};
  overflow: hidden;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
`
export const Card_wrap = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: flex-start; */
  padding: 30px 0;

  @media (max-width: 1199px) {
    display: block;
  }
`
export const Mobile_reverse = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 1199px) {
    display: flex;
    flex-direction: column-reverse;
  }
`
export const Mobile_reverse__content = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 1199px) {
    width: 100%;
    display: block;
  }
`

// Styled_Btn
interface Styled_Btn_Props {
  type: string
}
export const Styled_Btn = styled.div<Styled_Btn_Props>`
  background: ${(props) => props.type === 'supply' ? '#FF973C' : props.type === 'borrow' ? '#05C7A0' : '#507BFC'};
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  opacity: 0.95;
  transition: 0.3s;
  border-radius: 4px;

  :hover {
    opacity: 1;
    cursor: pointer;
  }

  &.disabled {
    background: #EFF1F4 !important;
    color: #9FA4B3 !important;
    pointer-events: none !important;
    cursor: not-allowed !important;
  }
`

// Input
export const Input_wrap = styled.div`
  position: relative;
  height: 84px;
`
export const EnableFirst = styled.div`
  position: relative;
  height: 84px;
  font-size: 14px;
  font-weight: 500;
  color: #999CA2;
  display: flex;
  align-items: center;
  text-align: center;
`
export const StyledInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  color: #9598A4;
  font-weight: 500;
  font-size: 14px;
  padding-left: 14px;

  &[type='number'] {
    -moz-appearance: textfield;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`
interface MAX_Props {
  type: string
}
export const StyledMAX = styled.span<MAX_Props>`
  position: absolute;
  right: 14px;
  top: 11px;
  color: ${(props) => props.type === 'supply' ? '#FF973C' : props.type === 'borrow' ? '#05C7A0' : '#507BFC'};
  background: ${(props) => props.type === 'supply' ?
    'rgba(255, 151, 60, 0.4)' : props.type === 'borrow' ? 'rgba(5, 199, 160, 0.4)' : 'rgba(80, 123, 252, 0.4)'
  };
  padding: 4px 5px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
`


// Key__and__Value
export const Key__and__Value = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: #FFFFFF;
  height: 60px;
  line-height: 60px;
`
export const Key = styled.div`
  display: flex;
`
export const Key__icon = styled.div`
  display: flex;
  margin-right: 10px;
`
interface Key__textProps {
  withIcon?: boolean
  withColor?: string
}
export const Key__text = styled.span<Key__textProps>`
  font-size: ${(props) => props.withIcon ? '18px' : '16px'};
`
export const Available_Balance = styled.div<Key__textProps>`
  font-size: ${(props) => props.withIcon ? '18px' : '16px'};
  color: ${(props) => props.withColor ? props.withColor === 'supply' ? '#FF973C' : '#05C7A0' : ''};
`


// Operation Card
export const OperationCard = styled.div`
  width: 384px;
  margin-left: 20px;

  @media (max-width: 1199px) {
    width: 94%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`
export const OperationCard__content = styled.div`
  background: #121B2A;
  border-radius: 6px;
  padding: 0 20px 20px;
`
export const Tab__wrap = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #9598A4;
  line-height: 22px;
  display: flex;
  border-bottom: 1px solid #0D1521;
`
interface TabProps {
  type: string
}
export const Tab = styled.div<TabProps>`
  width: 50%;
  line-height: 60px;
  text-align: center;
  position: relative;

  &.active,
  :hover {
    font-weight: 600;
    color: #FFFFFF;
    cursor: pointer;
  }

  &.active {
    &::after {
      position: absolute;
      content: '';
      bottom: 5px;
      left: calc(50% - 15px);
      width: 30px;
      height: 5px;
      background: ${(props) => props.type === 'supply' ? '#FF973C' : props.type === 'borrow' ? '#05C7A0' : '#507BFC'};
      border-radius: 3px;
    }
  }
`


// DetailInfo
export const DetailInfo = styled.div`
  width: 324px;

  @media (max-width: 1199px) {
    width: 94%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`
export const DetailInfo__content = styled.div`
  background: #121B2A;
  border-radius: 4px;
  padding: 20px;
`
export const Pool__Info = styled.div`
  font-size: 18px;
  line-height: 60px;
  font-weight: 600;
`
export const Item = styled.div`
  display: flex;
  line-height: 32px;
  justify-content: space-between;
`
export const Item__title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #999CA2;
  display: flex;
  align-items: center;
`
export const Item__value = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
`


// Header
export const Header = styled.div`
  font-size: 16px;
  display: flex;
  background: #121B2A;
  padding: 0 16px;
  line-height: 80px;
  text-align: right;
  cursor: pointer;

  @media (max-width: 1199px) {
    width: 100%;
    padding: 0 20px;
    font-size: 14px;
    line-height: 60px;
  }
`
export const PoolName = styled.div`
  width: 240px;
  text-align: left;
  display: flex;
  align-items: center;

  img {
    width: 40px;
    border-radius: 5px;
    margin-right: 20px;
  }

  @media (max-width: 1199px) {
    flex: 1;
    img {
      width: 20px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
`
export const PoolAPY = styled.div`
  width: 15%;
  @media (max-width: 1199px) {
    flex: 0.6;
  }
`
export const PoolAboutUsers = styled.div`
  flex: 1;
  @media (max-width: 1199px) {
    flex: 1.7;
  }
`
interface PoolDetailProps {
  isOpenDetail?: boolean
}
export const PoolDetail = styled.div<PoolDetailProps>`
  flex: 1;
  font-weight: 600;
  color: #5EAFE7;

  img {
    width: 16px;
    margin-bottom: -2px;
    margin-left: 5px;
    transform: ${(props) => props.isOpenDetail ? 'rotateX(0deg)' : 'rotateX(180deg)'};
  }

  @media (max-width: 1199px) {
    flex: 0.4;
    span {
      display: none;
    }
  }
`


export const PoolItem = styled.div`
  width: 100%;
`
export const ListWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  background: #0D1521;
  border-radius: 8px;
  overflow: hidden;
  user-select: none;
  margin-bottom: 10px;

  @media (max-width: 1199px) {
    width: 100%;
  }
`


// 头部
export const HeaderWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  text-align: right;
  padding: 0 16px;
  margin-bottom: 20px;
  color: #999CA2;
  font-size: 16px;

  @media (max-width: 1199px) {
    font-size: 14px;
    width: 100%;
    padding: 0 20px;
  }
`
export const Title = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  font-size: 30px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 1199px) {
    width: 90%;
    font-size: 18px;
  }
`
export const Title__sub = styled.div`
  width: 950px;
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 24px;
  color: #999CA2;
  margin-bottom: 60px;

  @media (max-width: 1199px) {
    width: 86%;
    font-size: 14px;
  }
`


export const Details_Links = styled.div`
  width: 100%;
  padding: 0 20px;
`
export const Details_Links__title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 15px;

  @media (max-width: 1199px) {
    font-size: 16px;
  }
`
export const Details_Links__title__sub = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #999CA2;
  line-height: 24px;
  padding-bottom: 30px;

  @media (max-width: 1199px) {
    font-size: 12px;
    line-height: 18px;
  }
`


export const Links = styled.div`
  display: flex;
  font-size: 16px; 
  font-weight: 500;
  padding-bottom: 30px;

  @media (max-width: 1199px) {
    display: block;
  }
`
export const SingleLink = styled.div`
  width: 120px;
  color: #999CA2;

  @media (max-width: 1199px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`
export const SingleLinkOpen = styled.div`
  display: flex;
  color: #FFFFFF;
  margin-right: 40px;

  img {
    width: 18px;
  }

  @media (max-width: 1199px) {
    font-size: 14px;
    line-height: 26px;
    img {
      width: 16px;
    }
  }
`

