// Dependencies
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

// Queries and Mutations
import { GET_USERS } from "../queries/queries";

// Context
import LoginContext from "../context/LoginContext";

// Components
import Header from "../components/header";

export type TLoginAttempt = {
  id: number;
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_USERS);
  const { setIsLoggedIn } = useContext(LoginContext);

  const [loginAttempt, setLoginAttempt] = useState<TLoginAttempt>({
    id: Math.random(),
    email: "",
    password: "",
  });

  const handleLoginAttempt = () => {
    const id =
      data?.users?.findIndex((ids: any) => ids.email === loginAttempt.email) ||
      0;
    const success = id && data?.users?.[id].password === loginAttempt.password;
    success ? handleSuccessfulLoginAttempt(id) : handleFailedLoginAttempt();
  };

  function handleSuccessfulLoginAttempt(userId: number) {
    navigate("/");
    setIsLoggedIn(true);
    localStorage.setItem("id", data?.users?.[userId].id.toString());
  }

  function handleFailedLoginAttempt() {
    setIsLoggedIn(false);
  }

  return (
    <>
      <Header />
      <div className="d-block text-center">
        Email: <br />
        <input
          type="text"
          onChange={(e) =>
            setLoginAttempt({ ...loginAttempt, email: e.target.value })
          }
        />{" "}
        <br />
        Password: <br />
        <input
          type="password"
          onChange={(e) =>
            setLoginAttempt({ ...loginAttempt, password: e.target.value })
          }
        />{" "}
        <br />
        <button type="submit" onClick={handleLoginAttempt}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
