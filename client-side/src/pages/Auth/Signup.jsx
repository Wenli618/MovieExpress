import { useState } from "react";
import {Controller, useForm} from "react-hook-form"
import Joi from "joi"
import {joiResolver } from "@hookform/resolvers/joi"
import { Link, useNavigate } from "react-router-dom";
import {Button, Form, Alert} from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import{ CREATE_USER } from "../../graphQL/mutations/mutations"


function Signup({ onLogin }) {
  // JOI validation for react-hook-form
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email({ tlds: { allow: false }}),
    password: Joi.string().min(6).required(),
});

 // React-Hook-Forms
  // control - React Hook Forms Controller this is used to control the input
  // handleSubmit - React Hook Forms handleSubmit function this is used to handle the submit event
  // formState - React Hook Forms formState this is used to access the form state
  // reset - React Hook Forms reset function this is used to reset the form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const [createUser, { loading, err }] = useMutation(CREATE_USER);
  const [ errorMessage, setErrorMessage ] = useState("");
  const navigate = useNavigate(); 
  
  // submit login
  const onSubmit = async ( data, e ) => {
    e.preventDefault();
    const { username, email, password } = data;
    try {
      const result = await createUser({
        variables: {
          input: {
            username,
            email,
            password,
          }
        }
      });
      console.log(result.data);
      onLogin(result.data.createUser);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
      reset();
    }
  };


  

  return (
    <div className="formContainer">
        <h2 className="formTitle">Sign Up</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
        
        <Controller 
          name="username"
          control={control}
          render={({ field }) => (
            <Form.Group className="mb-4" controlId="username">
              <Form.Label className="formLabel visually-hidden">Username</Form.Label>
              <Form.Control 
                className="formInput"
                {...field}
                type="text" 
                placeholder="Username" 
              />
              {errors.username && (
                <Alert variant="danger"
                className="mb-2 alert-dark mb-0" >
                  {errors.username.message}
                </Alert>
              )}
            </Form.Group>
          )}
        />

        <Controller 
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Group className="mb-4" controlId="email">
              <Form.Label className="formLabel visually-hidden">Email</Form.Label>
              <Form.Control 
                className="formInput"
                {...field}
                type="email" 
                placeholder="Email" 
              />
              {errors.email && (
                <Alert variant="danger"
                className="mb-2 alert-dark mb-0" >
                  {errors.email.message}
                </Alert>
              )}
            </Form.Group>
          )}
        />

        <Controller  
          name="password"
          control={control}
          render={( {field} ) => (
            <Form.Group className="mb-3" controlId="password">
            <Form.Label className="formLabel visually-hidden">Password</Form.Label>
            <Form.Control 
                className="formInput"
                {...field}
                type="password" 
                placeholder="Password" 
                name="password" 
            />
            {
              errors.password && (
                <Alert variant="danger"
                className="mt-2 alert-dark mb-0">
                  {errors.password.message}
                </Alert>
              )}
          </Form.Group>
          )}
        />

        {errorMessage && (
          <Alert variant="danger" className="mt-2 alert-dark mb-0">
            {errorMessage}
          </Alert>
        )}

        <Button
         variant="warning"
         size="lg"
         block="true"
         className="w-100 mt-2 loginBtn"
         type="submit"
        >Sign Up</Button>
    </Form>

    <div className="userNav">
      <span>Already have an account? &nbsp;
        <Link to="/login" >Login</Link>
      </span>
    </div>
    </div>
  )
}

export default Signup;