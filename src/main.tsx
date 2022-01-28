import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import '~/config'
import '~/global.scss'

ReactDOM.render(
  <StrictMode>
    <h1>Trunfo</h1>
  </StrictMode>,
  document.querySelector('#root'),
)
