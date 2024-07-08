const express  = require('express');
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/ProductModel');
const Job = require('./models/JobModel');
const router = express.Router();

//routes


app.use(express.json())

app.get("/", (req, res) => {
    res.send(
      "<div style='display:flex; justify-content:center;align-items:center;height:100vh;font-size:30px;color: steelblue; font-weight:bold; ' >Miracle Backend</div>"
    );
  });

app.get('/hello', (req, res) => {
    res.send('Hello node api')
})




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


app.post('/addjob', async (req,res) => {
    try {
        const job = await Job.create(req.body)
        res.status(200).json(job)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


// get request with id

app.get('/job/:id', async ( req,res) => {
    try {
        const {id} = req.params;
        const products =  await Job.findById(id);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://stevemotif:JEWle0f9UDrbXxzc@webapi.opv3m57.mongodb.net/?retryWrites=true&w=majority&appName=webapi')
.then(() => {

console.log('connected')

app.listen(3005, ()=> {
    console.log(`Node API app is running on 3005`)
})


}).catch((error) => {
    console.log(error)
})