import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from "react";
import usePersistedState from "../hooks/usePersistedState";
import { queryClient } from "../utils/queryClient";

const defaultValues = {
  data: undefined,
  search: undefined,
  setData: () => undefined,
  setSearch: () => undefined,
};

export const DataContext = createContext(defaultValues);

export default function DataContextProvider({ children }) {
  const [data, setData] = usePersistedState({
    key: "data",
    defaultValue: [],
  });  
    const [search, setSearch] = useState();

  /**
   * defaultValue:  {
    adminId: 0,
    fullName: 'string',
    email: '',
    role: 'string',
}
   */  

  //   const { data, isLoading } = useLoginAdmin();
  

  return (
    <DataContext.Provider
      value={{
        data,
        search,
        setData,
        setSearch,        
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
