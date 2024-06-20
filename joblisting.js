const express = require('express')
const mongoose = require('mongoose')
const Job = require('../models/JobModel');
let app = express.Router()


//post a request

app.post('/addjob', async (req,res) => {
    try {
        const job = await Job.create(req.body)
        res.status(200).json(job)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://stevemotif:JEWle0f9UDrbXxzc@webapi.opv3m57.mongodb.net/?retryWrites=true&w=majority&appName=webapi')
.then(() => {
console.log('connected')
}).catch((error) => {
    console.log(error)
})


module.exports = app;