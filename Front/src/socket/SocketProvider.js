import { useEffect, useState, createContext } from "react";

// eslint-disable-next-line no-undef
const { REACT_APP_WEBSOCKET_URL } = process.env;
const ws = new WebSocket(REACT_APP_WEBSOCKET_URL);

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(ws);

  useEffect(() => {
    socket.onclose = () => {
      // Reconnect after a delay
      setTimeout(() => {
        setSocket(new WebSocket(REACT_APP_WEBSOCKET_URL));
      }, 1000);
    };
  }, [socket]);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
