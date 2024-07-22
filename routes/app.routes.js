const router = require("express").Router();
const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes");
const googleAuthRoutes = require("../services/auth");

router.use('/user',userRoutes);
router.use('/task',taskRoutes);

module.exports = router;


