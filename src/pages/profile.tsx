import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_RENTS_BY_ID, GET_USERS_BY_ID } from "../queries/queries";
import Header from "../components/header";


const Profile = () => {
  const navigate = useNavigate();
  const idIdentifier = localStorage.getItem("id");
  const { loading, error, data } = useQuery(GET_USERS_BY_ID, {
    variables: {id: idIdentifier}
  });

  const handleEdit = () => {
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
        <section>
          <div className="container">
            <div className="row">
              {data.users.map((user: any) => {
                return (
                  <div
                    className="py-5"
                    key={user.id}>
                    <h4>Name</h4>
                    <h3>{user.name}</h3>
                    <h4>Email</h4>
                    <h3>{user.email}</h3>
                    <h4>Password</h4>
                    <h3>{user.password}</h3>
                    <button
                      type="button"
                      onClick={() => navigate("/edit")}>Edit Profile</button>
                    <button
                      type="button"
                      onClick={() => navigate("/delete")}>Delete Account</button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    )
  } 
}

export default Profile;
