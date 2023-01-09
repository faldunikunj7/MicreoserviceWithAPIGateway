const { expressjwt: jwt } = require("express-jwt");
const secret = process.env.JWT_SECRET_KEY;

const authenticate = jwt({
	secret: secret,
    algorithms: ["HS256"]
});

module.exports = authenticate;