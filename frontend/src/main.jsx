import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import store from './redux/store.js'

import { ToastContainer } from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const toastStyles = {
  fontSize: '12px', // Adjust the font size as needed
  padding: '8px 12px', // Adjust the padding as needed
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Provider store={store} >

      <ThemeProvider>
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={2000} style={toastStyles}/>
    
       <App />
      
      </ThemeProvider>
      </Provider>
     </React.StrictMode>
)
