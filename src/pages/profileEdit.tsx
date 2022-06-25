import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS, PUT_USERS } from "../queries/queries";

const Edit = () => {
  const navigate = useNavigate();
  const idIdentifier = localStorage.getItem("id");
  const [changes, setChanges] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, error, data } = useQuery(GET_USERS);
  const [handleProfileChanges] = useMutation(PUT_USERS);

  const handleEdit = (item: any) => {
    handleProfileChanges({
      variables: { id: idIdentifier },
      optimisticResponse: true,
      update: (caches) => {
        const currentProfile: any = caches.readQuery({ query: GET_USERS });
        const updatedProfile = currentProfile.users.map((user: any) => {
          if (user.id === idIdentifier) {
            return {
              name: item.name,
              email: item.email,
              password: item.password,
            };
          } else {
            return { ...user };
          }
        });
        caches.writeQuery({
          query: GET_USERS,
          data: { user: updatedProfile },
        });
      },
    });
    navigate("/profile");
  };

  return (
    <div>
      <form>
        Nama:
        <input
          type="text"
          onChange={(e) => setChanges({ ...changes, name: e.target.value })}
        />
        Email:
        <input
          type="text"
          onChange={(e) => setChanges({ ...changes, email: e.target.value })}
        />
        Password:
        <input
          type="password"
          onChange={(e) => setChanges({ ...changes, password: e.target.value })}
        />
        <button type="submit" onClick={() => handleEdit(changes)}>
          Save Changes
        </button>
      </form>
      {changes.name}
      {changes.email}
      {changes.password}
    </div>
  );
};

export default Edit;
