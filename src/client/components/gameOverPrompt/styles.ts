import styled from 'styled-components'

import { displayFlex } from '../../styles'

export const Background = styled.div`
  ${displayFlex('center')}
  position: fixed
  z-index: 1
  left: 0
  top: 0
  width: 100%
  height: 100vh
  background: #000
  opacity: 0.4
`

export const Prompt = styled.div`
  ${displayFlex('center', 'center', 'column nowrap')}
  position: fixed
  z-index: 2
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
  background: #FFF
  border-radius: 5px
  width: 400px
  height: 200px
`

export const Message = styled.p`
  font-size: 1.3rem
  font-weight: bold
  font-family: sans-serif
  margin-top: unset
  text-align: center
`

export const Word = styled.p`
  font-size: 1.1rem
  font-family: sans-serif
  text-align: center
`
