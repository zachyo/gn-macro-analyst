import { useEffect, useState } from "react";


const usePersistedState = ({ key, defaultValue }) => {
  const [state, setState] = useState(() => {
    const storedState = sessionStorage.getItem(key);
    // console.log(key, storedState)
    return storedState !== null ? JSON.parse(storedState) : defaultValue;
  });

  useEffect(() => {
    if (state !== undefined && state !== null) {
      sessionStorage.setItem(key, JSON.stringify(state));
    } else {
      // console.log(`Removing ${key} from localStorage`);
      sessionStorage.removeItem(key);
    }
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
