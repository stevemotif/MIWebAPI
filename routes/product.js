const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/ProductModel');
let app = express.Router()


//post a request

app.post('/product', async (req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// get all request

app.get('/product', async ( req,res) => {
    try {
        const products =  await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// get request with id

app.get('/product/:id', async ( req,res) => {
    try {
        const {id} = req.params;
        const products =  await Product.findById(id);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update a request

app.put('/product/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const products =  await Product.findByIdAndUpdate(id, req.body)
        if(!products)
        {
            res.status(404).json({message: `cannot find any product with id ${id}`})
        }
        const updatedpdt = await Product.findById(id)
        res.status(200).json(updatedpdt)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// delete a request

app.delete('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const products = await Product.findByIdAndDelete(id)
        if(!products)
        {
            res.status(404).json({message: `cannot find any product with id ${id}`})

        }
        
        res.status(200).json(products)

    } catch (error) {
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