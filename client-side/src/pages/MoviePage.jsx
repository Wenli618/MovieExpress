
// This page is to show a movie information when user click the movie from home page


import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_MOVIE } from "../graphQL/queries/queries";

import {useParams } from "react-router-dom";


const MoviePage = () => {
  
  const { movieId } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_MOVIE, {
    variables: { movieId },
  })


  useEffect(() => {
    refetch(); // Refetch the query
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error)return <p>Error</p>;
 
  console.log(data)
  const movieData = data.getMovie
  
  return (
    <div className="moviePage">
      <img src={movieData.poster} alt="movie poster" />
      <div className="movieInfo">
        <h1>{movieData.title}</h1>
        <h4><strong>Director:</strong> {movieData.director}</h4>
        <h4><strong>Release Date:</strong> {movieData.releaseDate}</h4>
        <h4><strong>Overview:</strong></h4>
        <p>{movieData.overview}</p>
      </div>
      
    </div>
  )
}

export default MoviePage