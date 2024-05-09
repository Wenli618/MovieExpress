
// this page is the admin page, display movielist, provide button to delete movie and provide button to create/edit endpoints.
// the page is protected by ProtecteAdminRoute. A valid JWT token must be sent in the request header.

import {Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// The useQuery React hook is the primary API for executing queries in an Apollo application. To run a query within a React component, call useQuery and pass it a GraphQL query string. When your component renders, useQuery returns an object from Apollo Client that contains loading, error, and data properties you can use to render your UI
import { useEffect } from 'react';
import { useMutation } from "@apollo/client"
import { useState } from 'react';
import {BiSolidPencil, BiTrash} from "react-icons/bi"

import { GET_MOVIES } from "../../graphQL/queries/queries"
import { DELETE_MOVIE } from '../../graphQL/mutations/mutations';

// user: user data from App.js <ProtecteAdminRoute> 
const AuthPage = ({ user }) => {
  console.log(user)
    const { loading, error, data, refetch } = useQuery(GET_MOVIES)

    const [deleteId, setDeleteId] = useState("")

    // useMutation hook to delete movie
    const [deleteMovie] = useMutation(
        DELETE_MOVIE, {
            context: {
                headers: {
                    authorization: `${user.token}`,
                }
            },
        }
    )


    useEffect(() => {
      refetch();
    }, [deleteId]);
    // refetch the querry when deleteId changed
    
    if (loading) return <p>Loading...</p>;
    if (error)return <p>Error</p>;

   
    // handle delete function for delete movie from database when admin click delete button
    // id: movie id of the movied to be deleted
    const handleDelete = async (id) => {
    
        try{
            const result = await deleteMovie({
                variables: {deleteMovieId: id}
            });
            if (result.errors) {
                throw new Error(result.errors[0].message)
            } else {
                setDeleteId(id)
            }
        
        } catch(error){
            console.error(`Failded to delete journal entry: ${error.message}`)
        }
    }

  return (
    <div className='authPage'>
        <Button as={Link} to="/auth/movie/add" variant="warning" className='creatBtn'>Create</Button>
        
        <div className="movieTable">
        <Table hover>
        <thead>
          <tr >
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        {data.getMovies.map((data) =>(
        <tbody key={data.id}>
          <tr>
            <td>{data.id}</td>
            <td>{data.title}</td>
            <td className='actionIcons'>
              {/* display edit button */}
                <Button as={Link} to={`/auth/movie/edit/${data.id}`}variant='warning'>
                    <BiSolidPencil className='editIcon'/>
                </Button>
                {/* display delete button */}
                <Button as={Link} to="/auth" variant='warning' onClick={() => handleDelete(data.id)}>
                <BiTrash className='deleteIcon'/>
                </Button>
            </td>
          </tr>
        </tbody>
        ))}
      </Table>
      
        </div>
    </div>
  )
}

export default AuthPage


// <Link to={`movie/${data.id}`} key={data.id}>
        //   <img src={data.poster} alt="movie poster" className="moviePoster" />
        //   <h2 className="movieTitle">{data.title}</h2>
        // </Link>)