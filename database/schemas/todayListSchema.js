const {Schema} = require('mongoose');

const todayListSchema = new Schema({
    title: {
        type:  String,
        required: [true, 'Please Provide The Title Of Your Today.']
    }
})

module.exports = todayListSchema