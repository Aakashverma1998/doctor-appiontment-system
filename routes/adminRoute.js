const router = require("express").Router();
const { getAllUsers, getAllDoctors, changeAccountStatus} = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.get("/getAllUsers",auth, getAllUsers);

router.get("/getAllDoctors",auth, getAllDoctors);

router.post("/changeAccountStatus",auth, changeAccountStatus)

module.exports = router;