const Book = require("../models/BookModel")
const response = require("../utils/response")
const validate = require("../utils/validate")
const {validationResult} = require('express-validator');

exports.bookGetAll = async function (req, res) {
    console.log(req.auth);
    try {
        const rows = await Book.find({user: req.auth.id})
        return response.successResponse(res, rows)
    } catch (e) {
        return response.errorResponse(res, e.message, 500)
    }
}

exports.bookGet = async function (req, res) {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        if (!validate.ValidateObjectId(id)) return response.errorResponse(res, "Id format is not correct", 400)

        const book = await Book.findById(id);
        if (!book) return response.errorResponse(res, "Book not found", 404)

        return response.successResponse(res, book)
    } catch (e) {
        return response.errorResponse(res, e.message, 500)
    }
}

exports.bookPost = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return response.errorResponse(res, errors.array().map(d => d.msg).join("<br>"), 400);

        const book = new Book({
            name: req.body.name,
            author: req.body.author,
            year: req.body.year,
            pageNumber: req.body.pageNumber,
            isbnNumber: req.body.isbnNumber,
        })

        const exResult = await Book.exists({isbnNumber: book.isbnNumber})
        if (exResult) return response.errorResponse(res, "This ISBN number already exist!", 400)

        await Book.create(book)
        return response.successResponse(res, book)
    } catch (e) {
        response.errorResponse(res, e.message, 500)
    }
}

exports.bookPut = async function (req, res) {
    try {
        const id = req.params.id;
        if (!validate.ValidateObjectId(id)) return response.errorResponse(res, "Id format is not correct", 400);

        const errors = validationResult(req);
        if (!errors.isEmpty()) return response.errorResponse(res, errors.array().map(d => d.msg).join("<br>"), 400);

        const book = await Book.findById(id);
        if (!book) return response.errorResponse(res, "Book not found", 404);

        book.name = req.body.name;
        book.author = req.body.author;
        book.year = req.body.year;
        book.pageNumber = req.body.pageNumber;
        book.isbnNumber = req.body.isbnNumber;

        const exResult = await Book.exists({
            $and: [{isbnNumber: book.isbnNumber}, {_id: {$ne: id}}]
        });
        if (exResult) return response.errorResponse(res, "This ISBN number already exists!", 400);

        await Book.updateOne({_id: id}, book);
        return response.successResponse(res, book);
    } catch (e) {
        response.errorResponse(res, e.message, 500);
    }
}

exports.bookDelete = async function (req, res) {
    try {
        const id = req.params.id;
        if (!validate.ValidateObjectId(id)) return response.errorResponse(res, "Id format is not correct", 400);

        const book = await Book.findById(id);
        if (!book) return response.errorResponse(res, "Book not found", 404);

        await Book.deleteOne({_id: id});
        return response.successResponse(res, id);
    } catch (e) {
        response.errorResponse(res, e.message, 500);
    }
}
