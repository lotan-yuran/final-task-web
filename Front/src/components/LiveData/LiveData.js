import { Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { connectedUsersState } from "../../Recoil";

export const LiveData = () => {
  const connectedUsers = useRecoilValue(connectedUsersState);

  return (
    <>
      <Box>Number of connected users: {connectedUsers} </Box>
    </>
  );
};
