// user authentication
function isAuthenticated(context) {
    console.log(context);
    if(!context.user) {
        throw new Error('Not autheticated!')
    }
}

// user authorization
function isAuthorized(userId, context) {
console.log(userId, context.user._id)
    if (userId._id.toString() !== context.user._id.toString()) {
        throw new Error('Not authorized!')
    }
}

// this function veryfy if the user is admin
function isAdmin(context) {
    if (!context.user || context.user.role !== "admin"){ 
        throw new Error("You are not an administrator!");
    }
}

module.exports.isAuthenticated = isAuthenticated;
module.exports.isAuthorized = isAuthorized;
module.exports.isAdmin = isAdmin;