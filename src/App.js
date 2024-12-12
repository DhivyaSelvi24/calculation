import logo from './logo.svg';
import React ,{useState}from 'react';
import { Switch, FormControlLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './App.css';

function App() {
const[row,setRow]=useState([{category:"",Toggle:"",Amount:"",
}])
function handlechange(){
()=>setRow([...row,{category:"",Toggle:"",Amount:""}])

}
  return (
    <div className="container">
     <div className="row">
     <div className="column">Category <input type="text" placeholder='Enter category'/></div>
     <div className="column">Toggle
     <FormControlLabel
            control={<Switch />}
            label=""
          />

     </div>
     <div className="column">Amount<input type="number" placeholder='Enter amount'/></div>
     <div className="column">Action
      
      <div className="action-buttons">
        <IconButton color="primary" onClick={handlechange}>
       <AddIcon/>
        </IconButton>
        <IconButton color="secondary">
              <RemoveIcon />
            </IconButton>
      </div>
      
       </div>
     </div>
     
  

     </div>
   
  );
}

export default App;
