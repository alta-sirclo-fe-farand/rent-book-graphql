import { createContext } from "react";

const LoginContext = createContext({isLoggedIn: false, setIsLoggedIn: (login: any) => {},});

export default LoginContext;