import { createContext, useState } from "react";
import { Socket } from "socket.io-client";

type DataContextValue = {
  socket: Socket | undefined
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>
  showProgress: boolean
  setShowProgress: React.Dispatch<React.SetStateAction<boolean>>
  progress: number
  setProgress: React.Dispatch<React.SetStateAction<number>>
  showTick: boolean
  setShowTick: React.Dispatch<React.SetStateAction<boolean>>
};

export const DataContext = createContext<DataContextValue>({} as DataContextValue);
type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [showTick, setShowTick] = useState<boolean>(false)
  const value: DataContextValue = {
    socket, setSocket,
    progress, setProgress,
    showProgress, setShowProgress,
    showTick, setShowTick
  };
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;