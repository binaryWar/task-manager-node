const router = require("express").Router()
const googleAuthController = require("../controllers/googleAuth.controller");

router.post('/auth/verifyToken',googleAuthController.verifyGoogleToken);
module.exports = router;