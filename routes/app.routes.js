const router = require("express").Router();
const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes");
const authorize = require("../middleware/auth.middleware.controller");

router.use('/user',userRoutes);
router.use('/task',authorize, taskRoutes);

module.exports = router;


