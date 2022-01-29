import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client";
import { DELETE_USERS_BY_ID } from "../queries/queries";

const Delete = () => {

  const navigate = useNavigate();
  const idIdentifier = localStorage.getItem("id");
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USERS_BY_ID, {
    variables: {id: idIdentifier}
  });

  useEffect(() => navigate("/"));

  if(loading) {
    return (
      <div>please wait..</div>
    )
  } else {
    console.log("hapus berhasil");
    return (
      <div>account deleted successfully, redirecting to home</div>
    )
  }
}

export default Delete;
