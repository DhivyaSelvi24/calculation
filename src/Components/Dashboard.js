import React from "react";
import{Card,Typography,Button,TextField,Container,Grid} from '@mui/material'
function Dashboard(){
return(
<Container>
    <Grid>

    <Card>
        <Grid item xs={2}>
 <Typography variant="h4" class="column-header">Total Savings: </Typography>
 <Typography variant="h4" class="column-header">Total Expense: </Typography>
 </Grid>
        
 
 

 </Card>
    </Grid>



</Container>

)


}
export default Dashboard;