import { createContext, useRef, useState } from "react";
import { Socket } from "socket.io-client";

type DataContextValue = {
  socket: Socket | undefined
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>
  containerRef:React.MutableRefObject<null>
};

export const DataContext = createContext<DataContextValue>({} as DataContextValue);
type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const containerRef = useRef(null); // Use 'null' initially


  const value: DataContextValue = {
    socket,
    setSocket,
    containerRef
  };
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;