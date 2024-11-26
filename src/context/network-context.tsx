import React from 'react';
import { NoInternetScreen } from '../screen';
import NetInfo from '@react-native-community/netinfo';


interface NetworkContextType { isConnected: boolean };
const NetworkContext = React.createContext<NetworkContextType>({ isConnected: false });

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = React.useState(false);
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ? false : true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
      <NoInternetScreen />
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextType => React.useContext(NetworkContext);