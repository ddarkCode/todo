require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');

const todayRouter = require('../routes/todayRoutes');
const WorkTaskRoutes = require('../routes/workTaskRoutes')

const log = console.log;
const {PORT, MONGO_URL} = process.env

const app = express();

try {
    (async function confirmDatabaseConnection(){
        await mongoose.connect(MONGO_URL)
        log('MongoDB connected successfully.')
    }())
} catch (error) {
    log(error)
}

app.use(morgan('combined'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/today', todayRouter());
app.use('/work', WorkTaskRoutes());

app.listen(PORT, () => {
    log(`Server started successfully on port:${PORT}.`)
})