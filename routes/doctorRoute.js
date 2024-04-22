const router = require("express").Router();
const { doctorRegister, notification ,deleteNotification} = require("../controllers/doctorController");
const auth = require("../middleware/auth");

router.post("/doctorRegister",auth, doctorRegister);

router.post("/get-all-notification",auth, notification);

router.post("/delete-all-notification",auth, deleteNotification);
module.exports = router;
