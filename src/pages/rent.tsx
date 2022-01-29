import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKS_BY_ID, GET_RENTS, POST_RENTS } from "../queries/queries";
import Header from "../components/header";
import moment from "moment";

const Rent = () => {
  const idIdentifier = localStorage.getItem('id');
  const navigate = useNavigate();
  const detail = useParams();
  const [returnDate, setReturnDate] = useState(moment().add(14, 'days').calendar());
  const { loading, error, data } = useQuery(GET_BOOKS_BY_ID, {
    variables: {id: detail.id}
  });
  const [handleNewRents] = useMutation(POST_RENTS);

  const handleConfirm = () => {
    handleNewRents({
      variables: { user_id: idIdentifier, book_id: detail.id, returnDate: returnDate },
      optimisticResponse: true,
      update: caches => {
        const rentAddition: any = caches.readQuery({ query: GET_RENTS })
        const updatedRentAddition = rentAddition.rents.push({ 
          user_id: idIdentifier, book_id: detail.id, returnDate: returnDate
        })
        caches.writeQuery({
          query: GET_RENTS,
          data: { rent: updatedRentAddition }
        })
      }
    })
    navigate("/history");
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
                    Choose Rent Period: <br />
                      <select name="returnDate" id="returnDate"
                        onChange={(opt) => setReturnDate(opt.target.value)}>
                        <option value={moment().add(14, 'days').calendar()}>
                          2 weeks ({moment().add(14, 'days').calendar()})
                        </option>
                        <option value={moment().add(30, 'days').calendar()}>
                          4 weeks ({moment().add(30, 'days').calendar()})
                        </option>
                        <option value={moment().add(90, 'days').calendar()}>
                          12 weeks ({moment().add(90, 'days').calendar()})
                        </option>
                      </select> <br />
                    <button
                      className="mt-4"
                      type="submit"
                      onClick={() => handleConfirm()}>Confirm Payment</button>
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

export default Rent;
