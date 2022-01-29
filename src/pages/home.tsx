import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import Header from "../components/header";
import '../components/style.css';

const Home = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BOOKS);

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
                {data.books.map((book: any) => {
                  return (
                    <div 
                      className="col-md-3 col-sm-6 py-5"
                      key={book.id}>
                      <div
                        className="card"
                        onClick={() => navigate(`/detail/${book.id}`)}>
                        <img
                          className="card-img-top" 
                          src={book.image} alt="" />
                        <h6>{book.title}</h6>
                      </div>
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

export default Home;
