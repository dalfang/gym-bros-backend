const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
<<<<<<< HEAD
        if(req.header.authorization) {
=======
        if(req.headers.authorization) {
>>>>>>> origin/main
            const token = req.headers.authorization;
            const theDecodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
            req.payload = theDecodeToken;
            next()
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json("token not provided or not valid");
    }
};

module.exports = {
    isAuthenticated,
};