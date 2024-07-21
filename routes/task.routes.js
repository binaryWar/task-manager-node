const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.get("/fetch",taskController.fetchTaskList);
router.put("/update/:id",taskController.updateTask);
router.delete("/delete/:id",taskController.deleteTask);
router.post("/create",taskController.createTask);

module.exports = router;