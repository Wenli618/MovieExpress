const gql = require('graphql-tag')

const movieType = gql`
    type Movie {
        id: ID!
        title: String!
        overview: String
        poster: String
        releaseDate: String
        director: String
    }
   
    input CreateMovieInput {
        title: String!
        overview: String!
        poster: String!
        releaseDate: String!
        director: String!
    }
    
    input UpdateMovieInput {
        title: String
        overview: String
        poster: String
        releaseDate: String
        director: String
    }

    type Query {
        getMovie(id: ID!): Movie
        getMovies: [Movie]
        searchMovies(title: String!):[Movie]
    }

    type Mutation {
        createMovie (input: CreateMovieInput)  : Movie!
        updateMovie (id: ID!, input: UpdateMovieInput ): Movie!
        deleteMovie (id:ID!): Boolean!
    }
`;

module.exports = movieType;