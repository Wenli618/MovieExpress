
import { useState } from "react";
import {Controller, useForm} from "react-hook-form"
import Joi from "joi"
import {joiResolver } from "@hookform/resolvers/joi"
import { Link, useNavigate } from "react-router-dom";
import {Button, Form, Alert} from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import{ LOGIN_USER } from "../../graphQL/mutations/mutations"


function Login({ onLogin }) {
  // JOI validation for react-hook-form
  const schema = Joi.object({
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
      email: "",
      password: "",
    },
  })

  const [loginUser, { loading, err }] = useMutation(LOGIN_USER);
  const [ errorMessage, setErrorMessage ] = useState("");
  const navigate = useNavigate(); 
  
  // submit login
  const onSubmit = async ( data, e ) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const result = await loginUser({
        variables: {
          input: {
            email,
            password,
          }
        }
      });
      console.log(result.data);
      onLogin(result.data.loginUser);
    if (result.data.loginUser.role === "admin"){
      navigate("/auth")
    } else{
      navigate("/")
    }
   

      ;
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
      reset();
    }
  };


  

  return (
    <div className="formContainer">
        <h2 className="formTitle">Login</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
        
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
        >Login</Button>
    </Form>

    <div className="userNav">
      <span>Don't have an account? &nbsp;
        <Link to="/signup" >Sign Up</Link>
      </span>
    </div>
    </div>
  )
}

export default Login;