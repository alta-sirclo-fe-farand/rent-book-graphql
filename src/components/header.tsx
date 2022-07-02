// Dependencies
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context
import LoginContext from "../context/LoginContext";
import SearchContext from "../context/SearchContext";

// Assets
import Logo from "../assets/bootstrap-logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const handleOnChange = (e: any) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search/${searchValue}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("id");
    setIsLoggedIn(false);
    setSearchValue("");
    navigate("/");
  };

  const handleLogin = () => {
    setSearchValue("");
    navigate("/login");
  };

  const navigateHome = () => {
    setSearchValue("");
    navigate("/");
  };

  const navigateProfile = () => {
    setSearchValue("");
    navigate("/profile");
  };

  const navigateHistory = () => {
    setSearchValue("");
    navigate("/history");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/" onClick={navigateHome}>
        <img src={Logo} width="40" height="40" alt="" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <form className="form-inline my-2 my-lg-0 mr-auto">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleOnChange}
          value={searchValue}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isLoggedIn ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link" onClick={navigateHome}>
                Home
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={navigateProfile}>
                Profile
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={navigateHistory}>
                History
              </span>
            </li>
          </ul>
        ) : (
          <></>
        )}
        <ul className="navbar-nav ml-auto">
          {isLoggedIn ? (
            <li className="nav-item">
              <span className="nav-link" onClick={handleLogout}>
                Logout
              </span>
            </li>
          ) : (
            <li className="nav-item">
              <span className="nav-link" onClick={handleLogin}>
                Login
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
