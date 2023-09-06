const {model} = require('mongoose');

const todayListSchema = require('../schemas/todayListSchema')

module.exports = model('Today', todayListSchema)