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
  user: undefined,
  loggedIn: false,
  setLoggedIn: () => undefined,
  setUser: () => undefined,
  authToken: undefined,
  logoutUser: () => undefined,
  loginUser: () => undefined,
  setAuthToken: () => undefined,
};

export const AuthContext = createContext(defaultValues);

export default function AuthContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = usePersistedState({
    key: "loggedIn",
    defaultValue: false,
  });
  const [user, setUser] = usePersistedState({
    key: "user",
    defaultValue: undefined,
  });
  //   const [user, setUser] = useState();

  /**
   * defaultValue:  {
    adminId: 0,
    fullName: 'string',
    email: '',
    role: 'string',
}
   */
  const [authToken, setAuthToken] = usePersistedState({
    key: "authToken",
    defaultValue: "",
  });

  //   const { data, isLoading } = useLoginAdmin();

  const logoutUser = useCallback(() => {
    setLoggedIn(false);
    setUser(null);
    setAuthToken(null);

    // queryClient.invalidateQueries(['/me'])
    queryClient.removeQueries(["/"]);
  }, [setLoggedIn, setUser]);

  const loginUser = useCallback(
    (user) => {
      // console.log(user);
      setUser(user);
    },
    [setUser]
  );

  //   useEffect(() => {
  //     if (!isLoading) {
  //       if (data) {
  //         loginUser({
  //           user: data,
  //         });
  //       } else {
  //         logoutUser();
  //       }
  //     }
  //   }, [
  //     data,
  //     setUser,
  //     isLoading,
  //     setLoggedIn,
  //     loginUser,
  //     logoutUser,
  //   ]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        setUser,
        setLoggedIn,
        loginUser,
        logoutUser,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
