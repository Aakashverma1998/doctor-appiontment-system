const router = require("express").Router();
const {
  userRegister,
  login,
  getUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", userRegister);
router.post("/login", login);
router.post("/getUser", auth, getUser);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword/:id", resetPassword);

module.exports = router;
