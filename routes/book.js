const express = require("express")
const bookController = require("../controllers/BookController")
const {bookValidation} = require("../utils/validate")
const authanticateUser = require("../middleware/auth")
const auth = require("../middleware/jwt")
const router = express.Router()

router.use(auth)
router.get("/", bookController.bookGetAll)
router.get("/:id", bookController.bookGet)
router.post("/", authanticateUser, bookValidation, bookController.bookPost)
router.put("/:id", authanticateUser, bookValidation, bookController.bookPut)
router.delete("/:id", bookController.bookDelete)

module.exports = router;