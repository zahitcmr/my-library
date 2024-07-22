const express = require("express")
const bookController = require("../controllers/BookController")
const {bookValidation} = require("../utils/validate")
const auth = require("../middleware/jwt")
const router = express.Router()

router.use(auth)
router.get("/", bookController.bookGetAll)
router.get("/:id", bookController.bookGet)
router.post("/", bookValidation, bookController.bookPost)
router.put("/:id", bookValidation, bookController.bookPut)
router.delete("/:id", bookController.bookDelete)

module.exports = router;