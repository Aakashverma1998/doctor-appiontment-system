const router = require("express").Router()
const {userRegister,login,getUser} = require("../controllers/userController")
const auth = require("../middleware/auth")

router.post("/register",userRegister)
router.post("/login",login)
router.post("/getUser",auth,getUser)

module.exports = router