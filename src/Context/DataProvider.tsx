import { createContext, useState } from "react";
import { Socket } from "socket.io-client";

type DataContextValue = {
  socket: Socket | undefined
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>
};

export const DataContext = createContext<DataContextValue>({} as DataContextValue);
type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const [socket, setSocket] = useState<Socket>();

  const value: DataContextValue = {
    socket,
    setSocket,
  };
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;