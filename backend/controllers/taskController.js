const Task = require('../models/Task');
const statusCodes = require('http-status-codes').StatusCodes

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.status(statusCodes.OK).json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user.id });
  await task.save();
  res.status(statusCodes.CREATED).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(statusCodes.NOT_FOUND).json({ message: 'Task not found' });
  res.status(statusCodes.OK).json(task);
};

exports.deleteTask = async (req, res) => {
  const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!result) return res.status(statusCodes.NOT_FOUND).json({ message: 'Task not found' });
  res.status(statusCodes.OK).json({ message: 'Deleted successfully' });
};
