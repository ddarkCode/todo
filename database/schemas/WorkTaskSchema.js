const {Schema} = require('mongoose');

const workTaskSchema = new Schema({
    title: {
        type:  String,
        required: [true, 'Please Provide The Title Of Your Today.']
    }
})

module.exports = workTaskSchema