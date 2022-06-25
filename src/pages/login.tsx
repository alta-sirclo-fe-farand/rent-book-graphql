import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../queries/queries";
import Header from "../components/header";

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USERS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState({
    id: Math.random(),
    email: "",
    password: "",
  });

  const handleLogin = async (emailPass: any) => {
    for (let user of data.users) {
      if (
        user.email === emailPass.email &&
        user.password === emailPass.password
      ) {
        localStorage.setItem("id", user.id);
        setIsLoggedIn(true);
        break;
      }
    }
    loginStatus(); // login button must be pressed 2 times
  };

  const loginStatus = async () => {
    if (isLoggedIn) {
      console.log("login berhasil");
      navigate("/");
    } else {
      console.log("login gagal");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div>please wait..</div>
      </div>
    );
  } else {
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
          <button type="submit" onClick={() => handleLogin(loginAttempt)}>
            Login
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
