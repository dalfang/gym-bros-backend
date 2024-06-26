const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.header.authorization;
        if(authHeader && authHeader.startsWith("Bearer")) {
            const token = authHeader.split(" ")[1];
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
            req.payload = decodeToken;
            next()
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json("Token not provided or not valid");
    }
};

module.exports = {
    isAuthenticated,
};