import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";

import LoginContext from "../context/LoginContext";

import Logo from "../assets/bootstrap-logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [search, setSearch] = useState<string>("");
  const { loading, error, data } = useQuery(GET_BOOKS);

  const handleSearch = () => {
    // navigate("/");
    // const bookTitles = data.books.map((book: any) => {
    //   book.title
    // });
    // const filteredBooks = bookTitles.filter((bookTitle: string) => {
    //   bookTitle.includes(search) === true
    // });
    // const searchResult = data.books.filter((book: any) => {
    //   filteredBooks.includes(book.title) === true
    // });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src={Logo} width="40" height="40" />
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
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </form>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <span className="nav-link" onClick={() => navigate("/")}>
              Home
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link" onClick={() => navigate("/profile")}>
              Profile
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link" onClick={() => navigate("/history")}>
              History
            </span>
          </li>
        </ul>
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
