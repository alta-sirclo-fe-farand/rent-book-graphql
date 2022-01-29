import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_BY_ID } from "../queries/queries";
import Header from "../components/header";

const Detail = () => {
  const navigate = useNavigate();
  const detail = useParams();
  const { loading, error, data } = useQuery(GET_BOOKS_BY_ID, {
    variables: {id: detail.id}
  });

  const handleRent = (book_id: any) => {
    navigate(`/rent/${book_id}`);
  }

  if(loading) {
    return (
      <div>
        <Header />
        <div>please wait..</div>
      </div>
    )
  } else {
    return (
      <div>
        <Header />
        <div className="container">
          {data.books.map((book: any) => {
            return (
              <div
                key={book.id}
                className="py-5">
                <div className="row">
                  <div className="col-sm-6">
                    <img src={book.image} alt="" width="200px" />
                  </div>
                  <div className="col-sm-6">
                    <h4>{book.title}</h4>
                    <h4>{book.author}</h4>
                    <h4>{book.ISBN}</h4>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={() => handleRent(book.id)}>Rent</button>
                  </div>
                </div>
              </div>
            )
            })}
        </div>
      </div>
    )
  }
}

export default Detail;
