// import React, { useEffect, useState } from 'react';
// import { Switch, FormControlLabel, IconButton, Container, Grid, TextField, Typography, Card, CardContent, Fab } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { PieChart, Pie, Tooltip, Cell } from 'recharts';

// function Dashboard() {
//   // States
//   const [totalExpenses, setTotalExpenses] = useState(0); // Starting with 0
//   const [budget, setBudget] = useState(200); // Example budget
//   const [expenses, setExpenses] = useState([
//     { category: 'Food', amount: 50, date: '2024-12-18' },
//     { category: 'Transport', amount: 30, date: '2024-12-17' },
//     { category: 'Entertainment', amount: 20, date: '2024-12-16' },
//   ]);

//   // Calculate total expenses dynamically
//   useEffect(() => {
//     let total = 0;
//     expenses.forEach(expense => {
//       total += expense.amount;
//     });
//     setTotalExpenses(total);
//   }, [expenses]);

//   const remainingBudget = budget - totalExpenses;

//   // Data for Pie Chart (category-wise breakdown)
//   const data = expenses.map(expense => ({
//     name: expense.category,
//     value: expense.amount,
//   }));

//   // Handle Add Expense (for now just adding dummy data)
//   const handleAddExpense = () => {
//     const newExpense = { category: 'Shopping', amount: 40, date: '2024-12-19' };
//     setExpenses([...expenses, newExpense]);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>Expense Tracker</Typography>
      
//       {/* Expense Summary */}
//       <Card sx={{ marginTop: 4, padding: 2 }}>
//         <CardContent>
//           <Typography variant="h6" align="center">Total Expenses: Rs.{totalExpenses}</Typography>
//           <Typography variant="h6" align="center">Budget: Rs.{budget}</Typography>
//           <Typography variant="h6" align="center">Remaining Budget: Rs.{remainingBudget}</Typography>
//         </CardContent>
//       </Card>

//       {/* Category Breakdown (Pie Chart) */}
//       <PieChart width={400} height={400} style={{ marginTop: 20 }}>
//         <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>

//       {/* Recent Expenses */}
//       <div>
//         <Typography variant="h6" sx={{ marginTop: 3 }}>Recent Expenses</Typography>
//         {expenses.slice(0, 5).map((expense, index) => (
//           <Card key={index} sx={{ marginTop: 2 }}>
//             <CardContent>
//               <Typography variant="body1">{expense.category}</Typography>
//               <Typography variant="body2">Amount: Rs.{expense.amount}</Typography>
//               <Typography variant="body2">{expense.date}</Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Add Expense Button */}
//       <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleAddExpense}>
//         <AddIcon />
//       </Fab>
//     </Container>
//   );
// }

// export default Dashboard;
