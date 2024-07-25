const { type } = require("os");
const BookHolder = require("../models/BookHolderModel")
const Book = require("../models/BookModel")
const response = require("../utils/response")
const validate = require("../utils/validate")
const {validationResult} = require('express-validator');

exports.bookHolderGetAll = async function (req, res) {
    try {
        const rows = await BookHolder.find();
        return response.successResponse(res, rows)
    } catch (e) {
        return response.errorResponse(res, e.message, 500)
    }
}

exports.bookHolderGet = async function (req, res) {
    try {
        const id = req.params.id;
        if (!validate.ValidateObjectId(id)) return response.errorResponse(res, "Id format is not correct", 400);

        const bookHolder = await BookHolder.findById(id);

        if (!bookHolder) return response.errorResponse(res, "Book holder not found", 404);

        return response.successResponse(res, bookHolder);
    } catch (e) {
        response.errorResponse(res, e.message, 500);
    }
}

exports.bookHolderPost = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return response.errorResponse(res, errors.array().map(d => d.msg).join("<br>"), 400);

        const bookHolder = new BookHolder({
            user: req.body.user,
            bookId: req.body.bookId,
            pickedAt: req.body.pickedAt,
            dueTime: req.body.dueTime,
            returnedAt: req.body.returnedAt,
            status: req.body.status
        })

        const exResult = await BookHolder.exists({user: bookHolder.user})
        if (exResult) return response.errorResponse(res, "This user already has a book!", 400)

        const exIdResult = await BookHolder.exists({ bookId: bookHolder.bookId, status: "Not Available" });
        if (exIdResult) return response.errorResponse(res, "This book is already assigned to another user!", 400);

        await BookHolder.create(bookHolder)
        return response.successResponse(res, bookHolder)
    } catch (e) {
        response.errorResponse(res, e.message, 500)
    }
}

exports.bookHolderPut = async function (req, res) {
    try {
        const id = req.params.id;
        if (!validate.ValidateObjectId(id)) return response.errorResponse(res, "Id format is not correct", 400);

        const errors = validationResult(req);
        if (!errors.isEmpty()) return response.errorResponse(res, errors.array().map(d => d.msg).join("<br>"), 400);

        const bookHolder = await BookHolder.findById(id);
        if (!bookHolder) return response.errorResponse(res, "Book holder not found", 404)

        bookHolder.user = req.body.user;
        bookHolder.bookId = req.body.bookId;
        bookHolder.pickedAt = req.body.pickedAt;
        bookHolder.dueTime = req.body.dueTime;
        bookHolder.returnedAt = req.body.returnedAt;
        bookHolder.status = req.body.status;

        const exResult = await BookHolder.exists({
            $and: [{user: bookHolder.user}, {_id: {$ne: id}}]
        });
        if (exResult) return response.errorResponse(res, "This user already has a book!", 400);

        const exIdResult = await BookHolder.exists({
            $and: [{bookId: bookHolder.bookId, status: "Not Available"}, {_id: {$ne: id}}]
        });
        if (exIdResult) return response.errorResponse(res, "This book is already assigned to another user!", 400);
        

        await BookHolder.updateOne({_id: id}, bookHolder);
        return response.successResponse(res, bookHolder);
    } catch (e) {
        response.errorResponse(res, e.message, 500);
    }
}
