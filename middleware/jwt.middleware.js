const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        if(req.header.authorization) {
            const token = req.header.authorization;
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

mpdule.exports = {
    isAuthenticated,
};