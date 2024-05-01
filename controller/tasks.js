const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const Task = require("../model/Task");
const mongoose = require("mongoose");

//Controllers
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createNewTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  if (!task) {
    return next(
      createCustomError(`No task found with the provided id: ${id}`, 404)
    );
  }
  res.status(201).json({ message: "Task created!", task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const task = await Task.findById(id);
  if (!task) {
    return next(
      createCustomError(`No task found with the provided id: ${id}`, 404)
    );
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return next(
      createCustomError(`No task found with the provided id: ${id}`, 404)
    );
  }
  res.status(200).json({ message: "Deleted Successfully!", data: task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomError(`No task found with the provided id: ${id}`, 404)
    );
  }
  res.status(201).json({ messgae: "Updated successfully", task });
});

module.exports = {
  getAllTasks,
  createNewTask,
  getTask,
  deleteTask,
  updateTask,
};
