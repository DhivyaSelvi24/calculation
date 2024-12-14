import logo from './logo.svg';
import React, { useState } from 'react';
import { Switch, FormControlLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './App.css';

function App() {
  const [row, setRow] = useState([{ category: "", Toggle: false, Amount: ""}]);

  // This function adds a new row
  function handleChange() {
    
    setRow([...row, { category: "", Toggle: false, Amount: "" }]);
    
  }

  function handleinput(e,index){
    const newrow=[...row];
    newrow[index][e.target.name]=e.target.value 
    newrow[index].Toggle=e.target.checked
    setRow(newrow)
  }
  function handleremove(index){
    if(row.length>1){
    const newrow=[...row];
    newrow.splice(index,1)
    setRow(newrow)
    }
  }
 

  return (
   
    <div className="container">
      <div className='row'>
  <div className='column'>Category</div>
  <div className='column'>Toggle</div>
  <div className='column'>Amount</div>
  <div className='column'>Action</div>
</div>
      {row.map((e, index) => (
        <div className="row" key={index}>
          <div className="column">
            
            <input
              type="text"
              placeholder="Enter category"
              name="category"
              value={e.category}
              onChange={(e)=>handleinput(e,index)}
             // Update category
            />
          </div>
          <div className="column">
            
            <FormControlLabel
              control={
                <Switch
                  checked={e.Toggle}
                  value={e.Toggle}
                  onClick={(e)=>{handleinput(e,index)}}
                  // Handle toggle switch change
                />
              }
              label=""
            />
          </div>
          <div className="column">
            
            <input
              type="number"
              placeholder="Enter amount"
              name="Amount"
              value={e.Amount}
              onChange={(e)=>{handleinput(e,index)}}
              // Update amount
            />
          </div>
          <div className="column">
            {index==0?(
            <div className="action-buttons">
              <IconButton color="primary" onClick={handleChange}>
                <AddIcon />
              </IconButton>
              <IconButton color="secondary" onClick={()=>handleremove(index)}>
                <RemoveIcon />
              </IconButton>
            </div>):null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
