const User = require("../models/UserModel")
const response = require("../utils/response")
const {validationResult} = require('express-validator');
const security = require("../utils/security")
const jwt = require("jsonwebtoken");


exports.login = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return response.errorResponse(res, errors.array().map(d => d.msg).join("<br>"), 400);

        const user = await User.findOne({
            $and: [
                {email: req.body.email},
                {password: security.SHA256(req.body.password)}
            ]
        })
        if (!user)
            return response.errorResponse(res, "Email or password is incorrect",400)

        const jwtPayload = {
            name: user.firstname + user.lastname,
            id: user._id
        }
        const jwtData = {
            expiresIn: "24h",
        };

        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtData);
        return response.successResponse(res, token)
    } catch (e) {
        return response.errorResponse(res, e.message, 500)
    }
}

exports.register = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return response.errorResponse(res, errors.array().map(d => d.msg).join("<br>"), 400);

        const exResult = await User.exists({email: req.body.email})
        if (exResult) return response.errorResponse(res, "This email already exist!", 400)

        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: security.SHA256(req.body.password)
        })

        await User.create(user)
        return response.successResponse(res, null)
    } catch (e) {
        return response.errorResponse(res, e.message, 500)
    }
}
