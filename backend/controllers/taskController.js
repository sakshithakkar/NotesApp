const Task = require('../models/Task');
const statusCodes = require('http-status-codes').StatusCodes;

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(statusCodes.OK).json(tasks);
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.status(statusCodes.CREATED).json(task);
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create task', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(statusCodes.NOT_FOUND).json({ message: 'Task not found' });
    }
    res.status(statusCodes.OK).json(task);
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update task', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!result) {
      return res.status(statusCodes.NOT_FOUND).json({ message: 'Task not found' });
    }
    res.status(statusCodes.OK).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete task', error: err.message });
  }
};
