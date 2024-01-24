import styled from 'styled-components'

import { displayFlex } from '../../styles'

export const GameSection = styled.section`
  ${displayFlex('flex-start', 'center', 'column nowrap')}
  padding: 2em 0
`

export const InputsSection = styled.section`
  position: relative
  margin-bottom: 20px
`

export const Message = styled.div`
  position: absolute
  top: 37%
  left: 104%
  min-width: 140px
  color: red
  font-size: 0.8rem
  font-family: sans-serif
`

export const GuessSection = styled.section`
  ${displayFlex('flex-start', 'center', 'column nowrap')}
  margin-bottom: 20px
`

export const GuessList = styled.div`
  ${displayFlex('flex-start', 'center', 'column nowrap')}
  gap: 5px
  margin-bottom: 20px
`

export const GuessWordContainer = styled.div`
  ${displayFlex('flex-start')}
  gap: 5px
`

export const GuessNumber = styled.span`
  font-family: sans-serif
`
