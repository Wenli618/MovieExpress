

// the purpse of this page is for admin to add new movie.
// the page is protected by ProtecteAdminRoute. A valid JWT token must be sent in the request header to verify admin.
import { Form, Button, Alert } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"


import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { useNavigate } from "react-router-dom"

import { useMutation} from "@apollo/client"

import { CREATE_MOVIE } from "../../graphQL/mutations/mutations"


// AddMovie: allow admin to add movie to database
const AddMovie = ({user}) => {
console.log(user)
// user data from App.js <ProtecteAdminRoute> 

// Joi validation
const schema = Joi.object({
  title: Joi.string().required(),
  poster: Joi.string().required(),
  director: Joi.string().required(),
  releaseDate: Joi.string().required(),
  overview: Joi.string().required()
})

//useForm
  //control - React Hook Forms Controller this is used to control the input
  //handleSubmit - React Hook Forms handleSubmit function this is used to handle the submit event
  //formState - React Hook Forms formState this is used to access the form state
  //reset - React Hook Forms reset function this is used to reset the form
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: joiResolver(schema),
  defaultValues: {
    title: "",
    poster: "",
    director: "",
    releaseDate: "",
    overview: ""
  }
})

// graphQL mutation for creating movie
const [createMovie] = useMutation(CREATE_MOVIE,)
const navigate = useNavigate(); 

// data: form data from add movie form
const onSubmit = async (data) => {
  const { title, poster, director, releaseDate, overview } = data;
  // destructure the data object
  const token = user.token;
    try{
      // send createmovie mutation request with data as input
      const result = await createMovie({
        variables: {
          input: {
            title,
            poster,
            director,
            releaseDate,
            overview,
          }
        },
        context: {
          headers: {
            authorization: `${token}`
          }
        }
      });
      console.log(result)
      console.log(result.data.createMovie)
      navigate("/auth")
    } catch(error){
      console.error(error);
    }
  }


return (
  <Form onSubmit={handleSubmit(onSubmit)} className="createMovieForm">
    <Controller 
      name="title"
      control={control}
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
      Add Movie
    </Button>
  </Form>
)
}


export default AddMovie