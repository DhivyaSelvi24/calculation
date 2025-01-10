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
  Modal
} from "@mui/material";
import "@fontsource/poppins";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import AddIcon from "@mui/icons-material/Add";
import { WbSunny } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { NightsStay } from "@mui/icons-material";

import { dark, light } from "@mui/material/styles/createPalette";

function App() {
  const [row, setRow] = useState(() =>
    localStorage.getItem("expenseRows") ? JSON.parse(localStorage.getItem("expenseRows")) : [{ category: "", Toggle: true, Amount: "" }]
  );
  const [total, setTotal] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedrow, setSelectedrow] = useState(null);

  // Save rows to local storage whenever they change
  useEffect(() => {
    console.log("hello");
    localStorage.setItem("expenseRows", JSON.stringify(row));
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

  // Save dark mode preference to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
    if (row.length > 1 && selectedrow !== null) {
      const newRow = [...row];
      newRow.splice(selectedrow, 1);
      setRow(newRow);
      setSelectedrow(null);
    }
    setOpen(false);
  }

  // Function to open modal
  function openModal(index) {
    setSelectedrow(index);
    setOpen(true);
  }

  function closeModal(index) {
    setOpen(false);
  }

  function handleToggle() {
    setDarkMode(!darkMode);
  }

  // Define light and dark themes
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside a valid destination, do nothing
    if (!destination) return;

    // Create a copy of the current rows
    const newRows = Array.from(row);

    // Reorder the rows based on drag result
    const [movedRow] = newRows.splice(source.index, 1);
    newRows.splice(destination.index, 0, movedRow);

    // Update the state with the reordered rows
    setRow(newRows);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ marginTop: 5 }}>
        <Card sx={{ backgroundColor: "#003366" }}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}
              >
                Expense Tracker
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleToggle} sx={{ marginLeft: 8 }}>
                {darkMode ? (
                  <NightsStay sx={{ color: "whitesmoke" }} />
                ) : (
                  <WbSunny sx={{ color: "#F6BE00" }} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Card>

        <Grid container spacing={6} sx={{ marginBottom: 2 }}>
          <Grid item xs={4}>
            <Typography variant="h6" className="column-header">
              Category
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: "center" }}>
            <Typography variant="h6" className="column-header">
              +/-{" "}
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

        {/* Drag-and-Drop Context */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {row.map((e, index) => (
                  <Draggable key={index} draggableId={`draggable-${index}`} index={index}>
                    {(provided) => (
                      <Grid
                        container
                        spacing={3}
                        key={index}
                        alignItems="center"
                        marginBottom={3}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
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
                            sx={{ width: "120px" }}
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
                              <IconButton color="secondary" onClick={() => openModal(index)}>
                                <RemoveIcon sx={{ marginLeft: 2.5 }} />
                              </IconButton>
                            )}
                            <Modal open={open}>
                              <Box sx={{ alignItems: "center" }}>
                                <Typography>Do you want to delete it?</Typography>
                                <Grid container spacing={2}>
                                  <Grid item>
                                    <Button variant="contained" className="primary" onClick={handleRemove}>
                                      DELETE
                                    </Button>
                                  </Grid>
                                  <Grid item>
                                    <Button variant="contained" className="secondary" onClick={() => closeModal(index)}>
                                      Cancel
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Modal>
                          </div>
                        </Grid>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Card sx={{ marginTop: 4, padding: 2, backgroundColor: "background.paper" }}>
          <CardContent>
            <Typography variant="h6" align="center">
              Total: {total}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
