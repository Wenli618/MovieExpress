import { useQuery } from "@apollo/client";
import { useEffect } from "react";
// import JournalEntry from "../Components/JournalEntry";
// import JournalCard from "../components/"

import { GET_MOVIES } from "../graphQL/queries/queries";

function MovieCard(){
  

  const { loading, error, data, refetch } = useQuery(GET_MOVIES)
}

useEffect(() => {
  refetch(); // Refetch the query
}, []);

if (loading) return <p>Loading...</p>;
if (error)return <p>Error</p>;

return (
  <>

  </>
)

export default MovieCard