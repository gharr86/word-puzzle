import styled from 'styled-components'

import { displayFlex } from '../../styles'
import { getBackgroundColor } from '../../utils'
import { LetterProps } from './types'

export default styled.div<LetterProps>`
  ${displayFlex('center')}
  width: 20px
  height: 20px
  border-radius: 2px
  font-family: sans-serif
  font-weight: bold
  font-size: 1rem
  color: ${({ status }) => status === 'none' ? '#000' : '#FFF'}
  background: ${({ status }) => getBackgroundColor(status)}
`
