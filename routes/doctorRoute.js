const router = require("express").Router();
const { doctorRegister, notification } = require("../controllers/doctorController");
const auth = require("../middleware/auth");

router.post("/doctorRegister",auth, doctorRegister);

router.post("/get-all-notification",auth, notification);
module.exports = router;
