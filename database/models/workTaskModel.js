const {model} = require('mongoose')

const workTaskSchema = require('../schemas/WorkTaskSchema');

const WorkTask = model('WorkTask', workTaskSchema);

module.exports = WorkTask;