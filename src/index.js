import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import { BrowserRouter as Router} from 'react-router-dom';

=======
import Dashboard from './Components/Dashboard';
>>>>>>> 50ba428441d44c9a5a7c6fd0d203f1b30eb1d8c2


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
<<<<<<< HEAD
   <Router>
    <App />
  </Router>



=======
  <App/>
    {/* <Dashboard/> */}
>>>>>>> 50ba428441d44c9a5a7c6fd0d203f1b30eb1d8c2
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
