const mongoose = require("mongoose");
const {body} = require("express-validator");
exports.ValidateObjectId = function (id) {
    return mongoose.isValidObjectId(id)
}

const year = new Date().getFullYear()
exports.bookValidation = [
    body("name").trim().isLength({min: 2}).withMessage("Name should be minimum 2 character"),
    body("author").trim().isLength({min: 2}).withMessage("Author should be minimum 2 character"),
    body("year").isInt({min: 0, max: year}).withMessage(`Year must be between 0-${year}`),
    body("pageNumber").isNumeric().withMessage("Page number must be only numeric characters"),
    body("isbnNumber").notEmpty().withMessage("ISBN number is required").replace(/ /g, "") // A book without an ISBN number is not a book
]

exports.loginValidate = [
    body("email").trim().isLength({min: 2}).withMessage("Email should be minimum 2 characters").isEmail().withMessage("Please enter your email in the correct format"),
    body("password").trim().isLength({min: 6}).withMessage("Password should be minimum 6 characters"),
]

exports.registerValidate = [
    body("email").trim().isLength({min: 2}).withMessage("Email should be minimum 2 characters").isEmail().withMessage("Please enter your email in the correct format"),
    body("password").trim().isLength({min: 6}).withMessage("Password should be minimum 6 characters"),
    body("firstname").trim().isLength({min: 2}).withMessage("First name should be minimum 2 characters"),
    body("lastname").trim().isLength({min: 2}).withMessage("Last name should be minimum 2 characters"),
]