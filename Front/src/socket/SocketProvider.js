import { useEffect, useState, createContext } from "react";

const WEBSOCKET_URL = "ws://localhost:3001";
const ws = new WebSocket(WEBSOCKET_URL);

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(ws);

  useEffect(() => {
    socket.onclose = () => {
      // Reconnect after a delay
      setTimeout(() => {
        setSocket(new WebSocket(WEBSOCKET_URL));
      }, 1000);
    };
  }, [socket]);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
