import ReactDOM from 'react-dom/client';

import '~/config';
import '~/global.scss';
import { App } from '~/App';

ReactDOM.createRoot(document.querySelector('#root')!).render(<App />);
