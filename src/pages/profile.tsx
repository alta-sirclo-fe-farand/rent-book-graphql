// Dependencies
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// Queries and Mutations
import {
  DELETE_USERS_BY_ID,
  GET_RENTS_BY_ID,
  GET_USERS_BY_ID,
  PUT_RENTS,
} from "../queries/queries";

// Context
import LoginContext from "../context/LoginContext";

// Components
import Header from "../components/header";

const Profile = () => {
  const navigate = useNavigate();
  const idIdentifier = localStorage.getItem("id");
  const { setIsLoggedIn } = useContext(LoginContext);
  const [profile, setProfile] = useState<any>({});
  const [rents, setRents] = useState<any>({});
  const { loading: loadingProfile } = useQuery(GET_USERS_BY_ID, {
    variables: { id: idIdentifier },
    onCompleted: (res) => {
      setProfile(res);
    },
  });
  const { loading: loadingRents } = useQuery(GET_RENTS_BY_ID, {
    variables: { user_id: idIdentifier },
    onCompleted: (res) => {
      setRents(res);
    },
  });

  const [deleteUser] = useMutation(DELETE_USERS_BY_ID, {
    variables: { id: idIdentifier },
    onCompleted: () => {
      setIsLoggedIn(false);
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [returnBook] = useMutation(PUT_RENTS, {
    variables: {
      id: idIdentifier,
    },
    onCompleted: () => {},
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

  if (loadingProfile || loadingRents) {
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
        <section>
          <div className="container">
            <div className="row">
              {profile?.users?.map((user: any) => {
                return (
                  <div className="py-5" key={user.id}>
                    <h4>Name</h4>
                    <h3>{user.name}</h3>
                    <h4>Email</h4>
                    <h3>{user.email}</h3>
                    <h4>Password</h4>
                    <h3>{user.password}</h3>
                    <button type="button" onClick={() => navigate("/edit")}>
                      Edit Profile
                    </button>
                    <button type="button" onClick={(e) => deleteUser()}>
                      Delete Account
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="px-5 py-5">
          <table className="table table-dark">
            <tbody>
              <tr>
                <td>Book ID</td>
                <td>Return Date</td>
                <td>Returned</td>
                <td>Action</td>
              </tr>
              {rents?.rents?.map((rent: any) => {
                return (
                  <tr key={rent.id}>
                    <td>{rent.book_id}</td>
                    <td>{rent.return_date}</td>
                    <td>{rent.returned.toString()}</td>
                    <td>
                      <button type="submit">Return</button>
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

export default Profile;
