import { gql } from '@apollo/client';


export const GET_MOVIE = gql`
    query GetMovie($movieId: ID!) {
  getMovie(id: $movieId) {
    id
    title
    overview
    poster
    releaseDate
    director
  }
}
`

export const GET_MOVIES = gql`
    query GetMovies {
  getMovies {
    id
    title
    overview
    poster
    releaseDate
    director
  }
}
`

export const SEARCH_MOVIES = gql`
    query SearchMovies($title: String!) {
  searchMovies(title: $title) {
    id
    title
    overview
    poster
    releaseDate
    director
  }
}
`
  
export const GET_USER = gql`
    query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      username
      email
      createdAt
      token
      role
    }
  }
`

export const GET_USERS = gql`
    query GetUsers {
    getUsers {
      id
      username
      email
      createdAt
      token
      role
    }
  }
`
  


