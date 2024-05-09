import { gql } from '@apollo/client';


export const CREATE_MOVIE = gql`
   mutation CreateMovie($input: CreateMovieInput) {
  createMovie(input: $input) {
    id
    title
    overview
    poster
    releaseDate
    director
  }
}
`

export const DELETE_MOVIE = gql`
   mutation DeleteMovie($deleteMovieId: ID!) {
  deleteMovie(id: $deleteMovieId)
}
`

export const UPDATE_MOVIE = gql`
    mutation UpdateMovie($updateMovieId: ID!, $input: UpdateMovieInput) {
  updateMovie(id: $updateMovieId, input: $input) {
    id
    title
    overview
    poster
    releaseDate
    director
  }
}
`

  
export const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
    createdAt
    token
    role
  }
}
`
  
export const UPDATE_USER = gql`
    mutation UpdateUser($updateUserId: ID!, $input: UpdateUserInput!) {
  updateUser(id: $updateUserId, input: $input) {
    id
    username
    email
    createdAt
    token
    role
  }
}
`

export const DELETE_USER = gql`
    mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    id
    username
    email
    createdAt
    token
    role
  }
}
`

export const LOGIN_USER = gql`
    mutation LoginUser($input: LoginInput!) {
  loginUser(input: $input) {
    id
    username
    email
    createdAt
    token
    role
  }
}
`
