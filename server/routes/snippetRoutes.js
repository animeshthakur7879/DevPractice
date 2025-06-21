const express = require("express")
const { addSnippet, getUserSnippets, getAllPublicSnippets, updateUserSnippet, deleteUserSnippet, getSingleSnippet } = require("../controllers/snippetController")
const protect = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/" , protect ,  addSnippet)
router.get("/:sid" , protect , getSingleSnippet)
router.get("/all/:uid" , protect , getUserSnippets)
router.get("/" , protect ,  getAllPublicSnippets)
router.put("/:sid" , protect ,  updateUserSnippet)
router.delete("/:sid" , protect , deleteUserSnippet)


module.exports = router