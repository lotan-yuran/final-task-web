import { Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { QuantityButton } from "../../components";
import { connectedUsersState } from "../../Recoil";
import { useSocket } from "../../socket/SocketHook";

export const LiveData = () => {
  const socket = useSocket();
  const connectedUsers = useRecoilValue(connectedUsersState);

  const handleIncrement = () => {
    socket.send("increment");
  };

  const handleDecrement = () => {
    if (connectedUsers > 1) {
      socket.send("decrement");
    }
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography component="span" variant="h4" color="text.primary" fontWeight="bold">
            Number of connected users: {connectedUsers}
          </Typography>
          {/* <Box>Number of connected users: {connectedUsers}</Box> */}
        </Grid>
        <Grid item>
          <QuantityButton
            size="large"
            quantity={connectedUsers}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          ></QuantityButton>
        </Grid>
      </Grid>
    </>
  );
};
