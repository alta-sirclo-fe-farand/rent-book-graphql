// Dependencies
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

// Context
import SearchContext from "../context/SearchContext";

// Queries and Mutations
import { GET_BOOKS_BY_SEARCH } from "../queries/queries";

// Components
import Header from "../components/header";

const Search = () => {
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);

  const { loading, error, data } = useQuery(GET_BOOKS_BY_SEARCH, {
    variables: { input: `%${searchValue}%` },
    onCompleted: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (loading) {
    return <>please wait</>;
  }
  return (
    <>
      <Header />
      <section>
        <div className="container">
          <p className="pt-3">Showing search results for "{searchValue}"</p>
          <div className="row">
            {data.books.map((book: any) => {
              return (
                <div className="col-md-3 col-sm-6 py-5" key={book.id}>
                  <div
                    className="card"
                    onClick={() => navigate(`/detail/${book.id}`)}
                  >
                    <img className="card-img-top" src={book.image} alt="" />
                    <h6>{book.title}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
