import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Container,
  Grid,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

function App() {
  const [row, setRow] = useState([{ category: "", Toggle: true, Amount: "" }]);
  const [total, setTotal] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // State to toggle dark mode

  // Update total when rows change
  useEffect(() => {
    let totalAmount = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i].Amount !== "") {
        if (row[i].Toggle === true) {
          totalAmount += parseFloat(row[i].Amount);
        } else if (row[i].Toggle === false) {
          totalAmount -= parseFloat(row[i].Amount);
        }
      }
    }
    setTotal(totalAmount);
  }, [row]);

  function handleChange() {
    setRow([...row, { category: "", Toggle: true, Amount: "" }]);
  }

  function handleInput(e, index) {
    const newRow = [...row];
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      newRow[index].Toggle = checked;
    } else {
      newRow[index][name] = value;
    }

    setRow(newRow);
  }

  function handleRemove(index) {
    if (row.length > 1) {
      const newRow = [...row];
      newRow.splice(index, 1);
      setRow(newRow);
    }
  }


  // Define light and dark themes
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ marginTop: 5 }}>
      <FormControl variant="filled"  sx={{marginBottom:6,width:"10em"}}>

<InputLabel id="theme">Mode</InputLabel>
<Select  labelId="select-label" value={darkMode ? "dark":"light"} onChange={(e)=>{const selecteddropdown=e.target.value; if(selecteddropdown=="dark" && !darkMode){ setDarkMode(true)}else{setDarkMode(false)}}}>
<MenuItem value="light">Light</MenuItem>
<MenuItem value="dark">Dark</MenuItem>


</Select>
</FormControl>
 

        <Typography variant="h4" align="center" gutterBottom>
          Expense Tracker
        </Typography>
        <Grid container spacing={6} sx={{ marginBottom: 2 }}>
          <Grid item xs={4}>
            <Typography variant="h6" className="column-header">
              Category
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" className="column-header">
              Calc
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" className="column-header">
              Amount
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" className="column-header">
              Act
            </Typography>
          </Grid>
        </Grid>

        {row.map((e, index) => (
          <Grid container spacing={3} key={index} alignItems="center" marginBottom={3}>
            <Grid item xs={4}>
              <TextField
                id="category"
                label="Category"
                variant="outlined"
                type="text"
                name="category"
                value={e.category}
                onChange={(e) => handleInput(e, index)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={e.Toggle}
                    name="Toggle"
                    onChange={(e) => handleInput(e, index)}
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
                onChange={(e) => handleInput(e, index)}
                fullWidth
                size="small"
                sx={{ width: "100px" }}
              />
            </Grid>
            <Grid item xs={2}>
              <div className="action-buttons">
                {index === 0 ? (
                  <IconButton color="primary" onClick={handleChange}>
                    <AddIcon sx={{ marginLeft: 3 }} />
                  </IconButton>
                ) : (
                  <IconButton color="secondary" onClick={() => handleRemove(index)}>
                    <RemoveIcon sx={{ marginLeft: 2.5 }} />
                  </IconButton>
                )}
              </div>
            </Grid>
          </Grid>
        ))}

        <Card sx={{ marginTop: 4, padding: 2, backgroundColor: "background.paper" }}>
          <CardContent>
            <Typography variant="h6" align="center">
              Total: {total}
            </Typography>
          </CardContent>
        </Card>
        {/* <Button type="button" variant="contained" onClick={handleThemeToggle} sx={{backgroundColor:darkMode?"primary.dark" :"primary.light"}}>
          Submit
        </Button> */}
        

      </Container>
    </ThemeProvider>
  );
}

export default App;
