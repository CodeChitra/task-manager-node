const { default: mongoose } = require("mongoose");
const moongoos = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task must have a name!"],
    trim: true,
    maxLength: [20, "Task name can not be more than 20 characters!"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
