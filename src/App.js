
import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel, IconButton, Container, Grid, TextField, Typography, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './App.css';

function App() {
  const [row, setRow] = useState([{ category: "", Toggle: false, Amount: "" }]);
  const [total, settotal] = useState(0);
  useEffect(() => {
    let totalamnt = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i].Amount != 0) {
        if (row[i].Toggle === true) {
          totalamnt += parseFloat(row[i].Amount);
        }
        else if (row[i].Toggle === false) {
          totalamnt -= parseFloat(row[i].Amount)
        }
      }
    }
    settotal(totalamnt);


  }, [row]


  )
  // This function adds a new row
  function handleChange() {

    setRow([...row, { category: "", Toggle: false, Amount: "" }]);

  }

  function handleinput(e, index) {
    const newrow = [...row];
    newrow[index][e.target.name] = e.target.value
    newrow[index].Toggle = e.target.checked
    setRow(newrow)
  }
  function handleremove(index) {
    if (row.length > 1) {
      const newrow = [...row];
      newrow.splice(index, 1);
      setRow(newrow)
    }
  }


  return (


    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <div className='column1'>Category</div>
        </Grid>
        <Grid item xs={3}>
          <div className='column1'>Toggle</div>
        </Grid>
        <Grid item xs={3}>
          <div className='column1'>Amount</div>
        </Grid>
        <Grid item xs={3}>
          <div className='column1'>Action</div>
        </Grid>



        {row.map((e, index) => (
<Grid container spacing={8}>

          <Grid item xs={3}>

            <TextField id="category" label="Enter Category" variant="outlined" type="text" sx={{ width: 100 }}>
              type="text"
              placeholder="Enter category"
              name="category"
              value={e.category}
              onChange={(e) => handleinput(e, index)}
            // Update category
            </TextField>
          </Grid>
          <Grid item spacing={3}>

            <FormControlLabel className='toggle-cs'
              control={
                <Switch
                  checked={e.Toggle}
                  value={e.Toggle}
                  onClick={(e) => { handleinput(e, index) }}
                // Handle toggle switch change
                />
              }
              
            />
          </Grid>
          <Grid item xs={3}>

            <TextField id="Amount" label="Enter Amount" variant="outlined" type="number"

              placeholder="Enter amount"
              name="Amount"
              value={e.Amount}
              onChange={(e) => { handleinput(e, index) }}>
            // Update amount
            </TextField>
          </Grid>
          <Grid item xs={2}>

            {index == 0 ? (
              <div className="action-buttons">
                <IconButton color="primary" onClick={handleChange}>
                  <AddIcon />
                </IconButton> </div>) : (
              <IconButton color="secondary" onClick={() => handleremove(index)}>
                <RemoveIcon />
              </IconButton>



            )}
          </Grid>


          </Grid>

        ))
        }
        <Card>
          <CardContent>

            <div className="column">Total:{total}
            </div>
          </CardContent>


        </Card>
        
      </Grid>
    </Container >
  );
}

export default App;
