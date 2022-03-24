import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import '~/config'
import '~/global.scss'
import App from '~/App'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector('#root'),
)
