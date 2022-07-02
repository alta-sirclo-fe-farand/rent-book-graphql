// Dependencies
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";

// Queries and Mutations
import { GET_BOOKS_BY_ID, POST_RENTS } from "../queries/queries";

// Components
import Header from "../components/header";

const Detail = () => {
  const navigate = useNavigate();
  const detail = useParams();
  const idIdentifier = sessionStorage.getItem("id");
  const [isRentPhase, setIsRentPhase] = useState<boolean>(false);
  const [returnDateOption, setReturnDateOption] = useState<number>(1);

  const formatReturnDate = () => {
    const returnDate = moment().add(
      returnDateOption === 1 ? 14 : returnDateOption === 2 ? 30 : 90
    );
    const year = parseInt(returnDate.format("YYYY"));
    const month = parseInt(returnDate.format("MM"));
    const date = parseInt(returnDate.format("DD"));
    return new Date(year, month - 1, date);
  };

  const { loading, error, data } = useQuery(GET_BOOKS_BY_ID, {
    variables: { id: detail.id },
  });

  const [handleRent] = useMutation(POST_RENTS, {
    variables: {
      user_id: idIdentifier,
      book_id: detail.id,
      return_date: formatReturnDate(),
    },
    onCompleted: () => {
      navigate("/profile");
    },
  });

  const handleConfirm = () => {
    setIsRentPhase(true);
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
        <div className="container">
          {data.books.map((book: any) => {
            return (
              <div key={book.id} className="py-5">
                <div className="row">
                  <div className="col-sm-6">
                    <img src={book.image} alt="" width="200px" />
                  </div>
                  <div className="col-sm-6">
                    <h4>{book.title}</h4>
                    <h4>{book.author}</h4>
                    <h4>{book.ISBN}</h4>
                    {!isRentPhase ? (
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={handleConfirm}
                      >
                        Rent
                      </button>
                    ) : (
                      <>
                        Choose Rent Period:
                        <br />
                        <select
                          name="returnDate"
                          id="returnDate"
                          onChange={(opt) =>
                            setReturnDateOption(parseInt(opt.target.value))
                          }
                        >
                          <option value={1}>
                            2 weeks ({moment().add(14, "days").calendar()})
                          </option>
                          <option value={2}>
                            4 weeks ({moment().add(30, "days").calendar()})
                          </option>
                          <option value={3}>
                            12 weeks ({moment().add(90, "days").calendar()})
                          </option>
                        </select>{" "}
                        <br />
                        <button
                          className="mt-4"
                          type="submit"
                          onClick={() => handleRent()}
                        >
                          Confirm Payment
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Detail;
