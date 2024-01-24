import React from 'react'
import ReactDOM from 'react-dom'

import { default as GlobalStyles } from './styles/globalStyles'

import Main from './components/main'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
)
