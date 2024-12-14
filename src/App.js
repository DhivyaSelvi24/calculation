
import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './App.css';

function App() {
  const [row, setRow] = useState([{ category: "", Toggle: false, Amount: ""}]);
  const[total,settotal]=useState(0);
  useEffect(()=>{
let totalamnt=0;
for(let i=0;i<row.length;i++){
if(row[i].Amount!=0 ){
  if(row[i].Toggle===true){
totalamnt+=parseFloat(row[i].Amount);
  }
  else if(row[i].Toggle===false){
  totalamnt-=parseFloat(row[i].Amount)
  }
}
}
settotal(totalamnt);


  },[row]
  
  
  )
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
      <div className='row' >
  <div className='column1'>Category</div>
  <div className='column1'>Toggle</div>
  <div className='column1'>Amount</div>
  <div className='column1'>Action</div>
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
          <div className="column" style={{margin:"150px"}}>
            
            <FormControlLabel className='toggle-cs'
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
          <div className="column" style={{margin:"150px"}}>
            {index==0?(
            <div className="action-buttons">
              <IconButton color="primary" onClick={handleChange}>
                <AddIcon />
              </IconButton>
              <IconButton color="secondary" onClick={()=>handleremove(index)}>
                <RemoveIcon />
              </IconButton>
            </div>
          
          
          ):null}
            
          </div>
        </div>
        
      ))}
<div className="row">
<div className="column">Total:{total}
</div>

</div>  
    </div>
  );
}

export default App;
