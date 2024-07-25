const express = require("express")
const bookHolderController = require("../controllers/BookHolderController")
const auth = require("../middleware/jwt")
const router = express.Router()

router.use(auth)
router.get("/", bookHolderController.bookHolderGetAll)
router.get("/:id", bookHolderController.bookHolderGet)
router.post("/", bookHolderController.bookHolderPost)
router.put("/:id", bookHolderController.bookHolderPut)

module.exports = router;