const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/details/:userId",userController.fetchUserDetails);
router.post("/registerUser",userController.registerUser)
router.post("/login",userController.loginUser);

module.exports = router;