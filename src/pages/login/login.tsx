// Dependencies
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

// Queries and Mutations
import { GET_USERS } from "../../queries/queries";

// Context
import LoginContext from "../../context/LoginContext";

// Styling
import "./login.css";

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

  const handleOnChangeLoginForm = (e: any) => {
    setLoginAttempt({ ...loginAttempt, [e.target.name]: e.target.value });
  };

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
    sessionStorage.setItem("id", data?.users?.[userId].id.toString());
  }

  function handleFailedLoginAttempt() {
    setIsLoggedIn(false);
  }

  return (
    <>
      <form className="form-container">
        <p>Email:</p>
        <input
          type="text"
          name="email"
          onChange={handleOnChangeLoginForm}
          className="input-field"
        />
        <p>Password:</p>
        <input
          type="password"
          name="password"
          onChange={handleOnChangeLoginForm}
          className="input-field"
        />
        <button type="submit" onClick={handleLoginAttempt}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
