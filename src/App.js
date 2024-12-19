import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel, IconButton, Container, Grid, TextField,Box,boxClasses,Typography, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dashboard from './Components/Dashboard';

function App() {
  const [row, setRow] = useState([{ category: "", Toggle: false, Amount: "" }]);
  const [total, settotal] = useState(0);

  useEffect(() => {
    let totalamnt = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i].Amount != 0 ) {
        if (row[i].Toggle === true) {
          totalamnt += parseFloat(row[i].Amount);
        } else if (row[i].Toggle === false) {
          totalamnt -= parseFloat(row[i].Amount);
        }
      }
    }
    settotal(totalamnt);
  }, [row]);

  function handleChange() {
    setRow([...row, { category: "", Toggle: false, Amount: "" }]);
  }

  function handleinput(e, index) {
    const newrow = [...row];
    newrow[index][e.target.name] = e.target.value;
    newrow[index].Toggle = e.target.checked;
    setRow(newrow);
  }

  function handleremove(index) {
    if (row.length > 1) {
      const newrow = [...row];
      newrow.splice(index, 1);
      setRow(newrow);
    }
  }

  return (

    <Container maxWidth="sm" sx={{ marginTop:5}}>
      <Typography variant="h4" align="center" gutterBottom>
        Expense Tracker
      </Typography>
      <Grid container spacing={4} sx={{ marginBottom: 2}}>
        <Grid item xs={3}>
          <Typography variant="h6" className="column-header">
            Category
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" className="column-header">
            Toggle
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" className="column-header">
            Amount
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" className="column-header">
            Action
          </Typography>
        </Grid>
      </Grid>

      {row.map((e, index) => (
        <Grid container spacing={5} key={index} alignItems="center" marginBottom={3}>
          <Grid item xs={3}>
            <TextField
              id="category"
              label="Category"
              variant="outlined"
              type="text"
              name="category"
              value={e.category}
              onChange={(e) => handleinput(e, index)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={e.Toggle}
                  value={e.Toggle}
                  onClick={(e) => handleinput(e, index)}
                />
              }
              sx={{ marginLeft: 1 }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="Amount"
              label="Amount"
              variant="outlined"
              type="number"
              name="Amount"
              value={e.Amount}
              onChange={(e) => handleinput(e, index)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <div className="action-buttons">
              {index === 0 ? (
                <IconButton color="primary" onClick={handleChange}>
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton color="secondary" onClick={() => handleremove(index)}>
                  <RemoveIcon />
                </IconButton>
              )}
            </div>
          </Grid>
        </Grid>
      ))}

      <Card sx={{ marginTop: 4, padding: 2, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" align="center">
            Total: {total}
          </Typography>
        </CardContent>
      </Card>
    </Container>
   
  );
  
}
<Dashboard/>
export default App;
