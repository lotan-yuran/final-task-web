import { useEffect, useState } from "react";
import { Box } from "@mui/material";

// const URL = "ws://127.0.0.1:3001";
export const LiveData = () => {
  const [connectedUsers, setConnectedUsers] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      ws.send("connectMe");
    };

    ws.onmessage = function (event) {
      const users = event.data;
      console.log("connectedUsers: ", users);
      setConnectedUsers(users);
    };

    //clean up function
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <Box>Number of connected Admin users: {connectedUsers} </Box>
    </>
  );
};
