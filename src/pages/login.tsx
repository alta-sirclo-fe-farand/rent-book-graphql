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

const Login = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_USERS);
  const { setIsLoggedIn } = useContext(LoginContext);

  const [loginAttempt, setLoginAttempt] = useState({
    id: Math.random(),
    email: "",
    password: "",
  });

  const handleLoginAttempt = (emailPass: any) => {
    const id =
      data?.users?.findIndex((ids: any) => ids.email === emailPass.email) || 0;
    const success = id && data?.users?.[id].password === emailPass.password;
    success ? handleSuccessfulLoginAttempt() : handleFailedLoginAttempt();
  };

  function handleSuccessfulLoginAttempt() {
    navigate("/");
    setIsLoggedIn(true);
  }

  function handleFailedLoginAttempt() {
    setIsLoggedIn(false);
  }

  return (
    <div>
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
        <button type="submit" onClick={() => handleLoginAttempt(loginAttempt)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
