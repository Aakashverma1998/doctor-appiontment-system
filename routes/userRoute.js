const router = require("express").Router()
const {userRegister,login} = require("../controllers/userController")

router.post("/register",userRegister)
router.post("/login",login)

module.exports = router