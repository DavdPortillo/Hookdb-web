import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import { Peanut } from './Peanut';

import './css/normalize.css';
import './css/style.css';
import { UserProvider } from './context/UserProvider';

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <UserProvider>

      <Peanut />
    </UserProvider>

  </BrowserRouter>


)
