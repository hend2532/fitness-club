// json-server --watch ./public/db.json --port 3001
// https://fitness-club-lyart.vercel.app/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Header from './components/Header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
    <Provider store={store}>
    {/* <Header/> */}
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
