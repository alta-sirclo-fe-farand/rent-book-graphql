// Dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// Queries and Mutations
import { GET_USERS_BY_ID, PUT_USERS } from "../queries/queries";

// Components
import Header from "../components/header";

const Edit = () => {
  const navigate = useNavigate();
  const idIdentifier = localStorage.getItem("id");
  const [changes, setChanges] = useState({
    name: "",
    email: "",
    password: "",
  });

  useQuery(GET_USERS_BY_ID, {
    variables: { id: idIdentifier },
    onCompleted: (res) => {
      setChanges({
        ...changes,
        name: res?.users?.[0]?.name,
        email: res?.users?.[0]?.email,
        password: res?.users?.[0]?.password,
      });
    },
  });

  const [editProfile] = useMutation(PUT_USERS, {
    variables: {
      id: idIdentifier,
      name: changes.name,
      email: changes.email,
      password: changes.password,
    },
    onCompleted: () => {
      navigate("/profile");
    },
  });

  const handleOnChangeProfile = (event: any) => {
    let value = event.target.value;
    let name = event.target.name;

    setChanges((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  return (
    <>
      <Header />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editProfile();
        }}
      >
        Nama:
        <input
          type="text"
          name="name"
          value={changes.name}
          onChange={handleOnChangeProfile}
        />
        Email:
        <input
          type="text"
          name="email"
          value={changes.email}
          onChange={handleOnChangeProfile}
        />
        Password:
        <input
          type="password"
          name="password"
          value={changes.password}
          onChange={handleOnChangeProfile}
        />
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
};

export default Edit;
