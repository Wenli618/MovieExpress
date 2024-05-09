const { Movie, validateMovieInput } = require('../../models/movie');
const { GraphQLError } = require('graphql');
const { isAuthenticated, isAuthorized, isAdmin } = require('../../helpers/auth')

const movieResolver = {
    Query: {
        getMovie: async (parent, args) => {
            try {
                let movie = await Movie.findById(args.id);
                if(!movie) {
                    throw new Error('Movie not found!')
                }
                return movie;
            } catch(error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'GET_MOIVE_ERROR'
                    },
                  });
            }
        },
        getMovies: async () => {
            try {
                return await Movie.find();
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'GET_MOIVES_ERROR'
                    },
                  });
            }
        },
        searchMovies: async (parent, args) => {
            try {
                return await Movie.find({
                     title: new RegExp('(' + args.title + ')', "i") })
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'SEARCH_MOIVES_ERROR'
                    },
                  });  
            }
        }
    }, 
    Mutation: {
        //  createMovie 
        createMovie: async (parent, args, context) => {
            try {
                // check if the user is admin, only admin can createMovie
                isAdmin(context);
                // validate input data before creating movie
                const { error, value } = validateMovieInput(args.input);
                console.log(error);
                if (error){
                    throw new Error('Invalid input data')
                }
                // create movie
               const movie = new Movie({
                title: args.input.title,
                overview: args.input.overview,
                poster: args.input.poster,
                releaseDate: args.input.releaseDate,
                director: args.input.director
               })
             
               await movie.save();
               return movie;
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'CREATE_MOIVE_ERROR'
                    },
                  });  
            }
        },

        // updateMovie (id: ID!, input: MovieInput ): Movie!
        updateMovie: async (parent, args, context) => {
            try {
                isAdmin(context);
            //    findByIdAndUpdate(id, updates, options, callbackes) , {new:true} returns the updated data
               return await Movie.findByIdAndUpdate(args.id, args.input, {new:true});

            } catch(error){
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'UPDATE_MOIVE_ERROR'
                    },
                  });  
            }
        },
        // deleteMovie (id:ID!): Boolean!
        deleteMovie: async (parent, args, context) => {
            try {
                isAdmin (context);
                const res =  await Movie.findByIdAndDelete(args.id);
                return res ?  true : false;
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'DELETE_MOIVE_ERROR'
                    },
                  });  
            }
        }
    }
    }
    
    module.exports = movieResolver;
