import styled from 'styled-components'

import { displayFlex } from '../../styles'

export default styled.div`
  ${displayFlex('center')}
  position: fixed
  z-index: 5
  width: 100%
  height: 100vh
  top: 0
  left: 0
  background: #FFF
  opacity: 0.8
`
