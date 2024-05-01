const express = require("express");
const {
  getAllTasks,
  createNewTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");

const router = express.Router();

router.route("/").get(getAllTasks).post(createNewTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
