import ReactDOM from 'react-dom/client'

import '~/config'
import '~/global.scss'
import { App } from '~/App'

ReactDOM
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .createRoot(document.querySelector('#root')!)
  .render(<App />)
