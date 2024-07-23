const router = require("express").Router();
const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes");
const authorize = require("../middleware/auth.middleware.controller");
const googleAuthRoutes = require("./googleAuth.routes");

router.use('/user',userRoutes);
router.use('/task',authorize, taskRoutes);
router.use('/google',googleAuthRoutes);

module.exports = router;


