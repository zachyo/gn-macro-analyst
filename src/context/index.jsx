import { useContext } from "react";
import { AuthContext } from "./auth";
import { DataContext } from "./dataContext";

export const useAuthContext = () => useContext(AuthContext);
export const useDataContext = () => useContext(DataContext);
