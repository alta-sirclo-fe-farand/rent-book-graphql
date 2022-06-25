import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { GET_RENTS_BY_ID, PUT_RENTS } from "../queries/queries";
import { useMutation, useQuery } from "@apollo/client";

const History = () => {
  const navigate = useNavigate();
  const idIdentifier = localStorage.getItem("id");
  const { loading, error, data } = useQuery(GET_RENTS_BY_ID, {
    variables: { user_id: idIdentifier },
  });
  const [handleCompletedRent] = useMutation(PUT_RENTS);

  const handleReturn = (item: any) => {
    handleCompletedRent({
      variables: { id: item.id },
      optimisticResponse: true,
      update: (caches) => {
        const rentStatus: any = caches.readQuery({ query: GET_RENTS_BY_ID });
        const updatedRentStatus = rentStatus.rents.map((rent: any) => {
          if (rent.id === item.id) {
            return { ...rent, returned: true };
          } else {
            return { ...rent };
          }
        });
        caches.writeQuery({
          query: GET_RENTS_BY_ID,
          data: { rent: updatedRentStatus },
        });
      },
    });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <p>please wait..</p>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <section className="px-5 py-5">
          <table className="table table-dark">
            <tbody>
              <tr>
                <td>Book ID</td>
                <td>Return Date</td>
                <td>Returned</td>
                <td>Action</td>
              </tr>
              {data.rents.map((rent: any) => {
                return (
                  <tr key={rent.id}>
                    <td>{rent.book_id}</td>
                    <td>{rent.return_date}</td>
                    <td>{rent.returned.toString()}</td>
                    <td>
                      <button type="submit" onClick={() => handleReturn(rent)}>
                        Return
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
};

export default History;
