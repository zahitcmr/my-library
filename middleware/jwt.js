 const { expressjwt: jwt } = require("express-jwt");
 const secret = process.env.JWT_SECRET;

 const authenticate = jwt({
     secret: secret || "secret",
     algorithms: ['HS256'],
 });
 
 module.exports = authenticate;