
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import JournalEntry from "../Components/JournalEntry";
// import JournalCard from "../components/"

import { GET_MOVIES } from "../graphQL/queries/queries";


const Home = () => {

  const { loading, error, data, refetch } = useQuery(GET_MOVIES)


useEffect(() => {
  refetch(); // Refetch the query
}, []);

if (loading) return <p>Loading...</p>;
if (error)return <p>Error</p>;


  return (
    <>
    <div className="movieList">
    {data.getMovies.map((data) =>
      (
        <Link to={`movie/${data.id}`} key={data.id}>
          <img src={data.poster} alt="movie poster" className="moviePoster" />
          <h2 className="movieTitle">{data.title}</h2>
        </Link>)
)}
    </div>
      
    </>
    

  )
}

export default Home