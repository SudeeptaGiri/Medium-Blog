function authentication(req,res,next){
    // This function is a placeholder for authentication logic
    // It can be used to check if a user is authenticated before accessing certain routes
    // For example, it could verify a JWT token or check session data
    console.log("Authentication middleware executed");
    next();
}

module.exports = {authentication};