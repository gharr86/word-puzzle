import styled from 'styled-components'

import { displayFlex } from '../../styles'

export const MainSection = styled.main`
  min-height: 100vh;
  ${displayFlex('flex-start', 'center', 'column nowrap')}
`

export const Title = styled.h1`
  font-family: sans-serif;
`
