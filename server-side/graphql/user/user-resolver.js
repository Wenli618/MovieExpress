// import necessary modules
const { GraphQLError } = require('graphql');
const { User, validateUser } = require('../../models/user');
const { isAuthenticated, isAuthorized, isAdmin } = require('../../helpers/auth')
const Joi = require('joi');
const _= require('lodash');

// define the resolvers for the User type
const userResolvers = {
    Query: {
        getUser: async (parent, args, context) => {
            try {
                // check if the user is authenticated
                isAuthenticated(context);
                // find the user with the given ID
                const user = await User.findById(args.id);
                // Throw an error if the user doesn't exist
                if(!user) {
                    throw new Error('User not found!')
                }
                // check if the user is authorized 
                isAuthorized(user, context)

                return user;
            } catch(error){
                throw new GraphQLError(error, {
                    extensions: {
                        code: 'GET_USER_ERROR',
                    },
                });
            }
        },
        
        getUsers: async (parent, args, context) => {
            try {
               console.log(context)
                // only admin has authorization to get all users
                isAdmin(context) 
        
                // find all users in the database
                const users = await User.find();
                return users;
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                        code: 'GET_USERS_ERROR',
                    },
                });
            }
        }
    },

    Mutation: {
        createUser: async (parent, args) => {
            try {
                // VALIDATE THE INPUT DATA USING A JOI SCHEMA
                const { error, value } = validateUser(args.input);
                // if input data is invalid, throw an Error
                if(error){
                    throw new Error(`Invalid user input ${error}`)
                }
               
                // default role of user is "member"
                value.role = "member"
                 // create a new user with the validatd input data
                const user = new User(value);
                await user.save()

                // generate an auth token for the new user
                let userData = _.pick(user, ['id', 'username', 'email', 'createdAt', 'role']);
                userData.token = user.generateAuthToken();
                // return the user data with auth token
                return userData;

            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                        code: 'CREATE_USER_ERROR',
                    },
                });
            }
        },
        loginUser: async (parent, args) => {
            try {
                // validate login input data using  joi schema
                const loginSchema = Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                  });

                  const { error, value } = loginSchema.validate(args.input)

                  if(error){
                    throw new Error(`Invalid user input ${error}`)
                  }

                //   find the user with the given email
                const user = await User.findOne ({ email: value.email });
                if(!user) {
                    throw new Error('Invalid email or password!')
                }

                // check if the password is correct
                const validPassword = await user.comparePassword(value.password, user.password)
                if(!validPassword){
                    throw new Error('Invalid email or password!')
                }

                let userData = _.pick(user, ['id', 'username', 'email', 'createdAt', 'role']);

                userData.token = user.generateAuthToken();

                return userData;
        
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                        code: 'LOGIN_USER_ERROR',
                    },
                }); 
            }
        },

        updateUser: async (parent, args, context) => {
            try {
              
                // check if the user is authenticated
                isAuthenticated(context);

                // find user by given ID
                const user = await User.findById(args.id)

                if (!user)  {
                    throw new Error('User not found!')
                }
                // check if the user is authorized to update user
                isAuthorized(user, context);

                // validate the input data using a Joi schema
                const { error, value } = validateUser(args.input);

                if(error){
                    throw new Errow(`Invalid user input ${error}`)
                }
                
                // find the user with given ID
                const updateUser = await User.findByIdAndUpdate(args.id, value, { new: true });

                return updateUser;

            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                        code: 'UPDATE_USER_ERROR',
                    },
                }); 
            }
        },

        deleteUser: async (parent, args, context) => {
            try{
                // check if the user is authenticated   
                isAuthenticated(context)

                // find user by id
                const user = await User.findById(args.id);
                if(!user) {
                    throw new Error ('User not found!')
                }

                // check if the user is authorized to delete the user;
                isAuthorized(user, context);

                // delete user
                const deleteUser = await User.findByIdAndDelete(args.id);

                return deleteUser;

            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                        code: 'DELETE_USER_ERROR',
                    },
                }); 
            }
        }
    }
} 

module.exports = userResolvers;