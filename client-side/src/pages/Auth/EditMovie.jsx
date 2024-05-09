import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { useParams, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"

import { GET_MOVIE } from "../../graphQL/queries/queries"
import { UPDATE_MOVIE } from "../../graphQL/mutations/mutations"

import { Form, Button, Alert } from "react-bootstrap"


const EditMovie = (props) => {

  const userData = props.user;

  const { movieId } = useParams()

  const navigate = useNavigate()

  const { loading, error, data, refetch} = useQuery(
    GET_MOVIE, {
      variables: { movieId },
      context: {
        headers: {
          authorization: `${userData.token}`,
        }
      }
    }
  )

  const [ updateMovie ] = useMutation(UPDATE_MOVIE)

  const onSubmit = async (formData) => {
    const { title, poster, director, releaseDate, overview } = formData;
    console.log(formData)
    console.log(userData)
    try {
     const result= await updateMovie({
        variables: {
          updateMovieId: movieId,
          input: { title, poster, director, releaseDate, overview }
        },
        context: {
          headers: {
            authorization: `${userData.token}`
          }
        }
      })
      console.log(result)
      navigate("/auth")
    } catch(error) {
      console.error(`Failed to update journal entry: ${error.message}`)
    }
  }

  const schema = Joi.object({
    title: Joi.string().required(),
    poster: Joi.string().required(),
    director: Joi.string().required(),
    releaseDate: Joi.string().required(),
    overview: Joi.string().required()
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema)
  })
  useEffect(() => {
    refetch(); // Refetch the query
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error)return <p>Error</p>;
 
  console.log(data)
  const movieData = data.getMovie


  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="createMovieForm">
    <Controller 
      name="title"
      control={control}
      defaultValue={data.getMovie.title}
      render={({ field }) => (
        <Form.Group className="mb-3" controlId="title">
        <Form.Label>Movie Title</Form.Label>
        <Form.Control 
        {...field} 
        type="text" 
        placeholder="Title" 
        />
        {errors.title && (
                <Alert variant="danger" className="mt-2 alert-dark mb-0">
                  {errors.title.message}
                </Alert>
              )}
      </Form.Group>
      )}
    />

    <Controller 
      name="poster"
      control={control}
      defaultValue={data.getMovie.poster}
      render={({ field }) => (
        <Form.Group className="mb-3" controlId="poster">
        <Form.Label>Poster</Form.Label>
        <Form.Control 
        {...field} 
        type="text" 
        placeholder="Poster" 
        />
        {errors.poster && (
                <Alert variant="danger" className="mt-2 alert-dark mb-0">
                  {errors.poster.message}
                </Alert>
              )}
      </Form.Group>
      )}
    />

    <div className="directorAndReleaseDate">
      <Controller 
        name="director"
        control={control}
        defaultValue={data.getMovie.director}
        render={({ field }) => (
          <Form.Group className="mb-3" controlId="title">
          <Form.Label>Director</Form.Label>
          <Form.Control 
          {...field} 
          type="text" 
          placeholder="Director" 
          />
          {errors.director && (
                  <Alert variant="danger" className="mt-2 alert-dark mb-0">
                    {errors.director.message}
                  </Alert>
                )}
        </Form.Group>
        )}
      />

      <Controller 
        name="releaseDate"
        control={control}
        defaultValue={data.getMovie.releaseDate}
        render={({ field }) => (
          <Form.Group className="mb-3" controlId="releaseDate">
          <Form.Label>ReleaseDate</Form.Label>
          <Form.Control 
          {...field} 
          type="date" 
          placeholder="ReleaseDate" 
          />
          {errors.releaseDate && (
                  <Alert variant="danger" className="mt-2 alert-dark mb-0">
                    {errors.releaseDate.message}
                  </Alert>
                )}
        </Form.Group>
        )}
      />  
    </div>
    
    <Controller 
      name="overview"
      control={control}
      defaultValue={data.getMovie.overview}
      render={({ field }) => (
        <Form.Group className="mb-3" controlId="overview">
        <Form.Label>Overview</Form.Label>
        <Form.Control 
        {...field} 
        type="text" 
        placeholder="Overview" 
        as="textarea"
        style={{ height: '100px' }}
        />
        {errors.overview && (
                <Alert variant="danger" className="mt-2 alert-dark mb-0">
                  {errors.overview.message}
                </Alert>
              )}
      </Form.Group>
      )}
    />

    {/* {errorMessage && (
      <Alert variant="danger" className="mt-2 alert-dart mb-0">{errorMessage}</Alert>
    )} */}
    
    <Button variant="warning" type="submit">
      Update Movie
    </Button>
  </Form>
  )
}

export default EditMovie