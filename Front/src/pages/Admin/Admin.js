import { Grid, Paper } from "@mui/material";
import { ManageItems, OrdersBarChart, LiveData } from "../../components";

export const Admin = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <ManageItems title={"Items"} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <LiveData />
          </Paper>
          <Paper elevation={2} sx={{ p: 2, my: 2 }}>
            {/* <OrdersLineChart /> */}
            <OrdersBarChart title="Orders Count by Users" />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
