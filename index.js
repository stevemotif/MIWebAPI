const express  = require('express');
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/ProductModel');
const Job = require('./models/JobModel');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const PatientList = require("./models/patientlist");
const crypto = require("crypto");

//routes


app.use(express.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get("/", (req, res) => {
    res.send(
      "<div style='display:flex; justify-content:center;align-items:center;height:100vh;font-size:30px;color: steelblue; font-weight:bold; ' >Miracle Backend 1.0</div>"
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

// Add a job


app.post('/addjob', async (req,res) => {
    try {
        console.log(req.body);
        const job = await Job.create(req.body)
        res.status(200).json(job)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})



// get all jobs

app.get('/job', async (req, res) => {
    try {
        const joblisting = await Job.find({});
        res.status(200).json(joblisting);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
    })

    
// get a single job

app.get('/job/:id', async ( req,res) => {
    try {
        const {id} = req.params;
        const products =  await Job.findById(id);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Update a job

app.put('/updatejob/:id', async (req, res) => {
    try {
        const {id} =  req.params;
        const findjob = await Job.findByIdAndUpdate(id, req.body);
        if(!findjob)
        {
          res.status(404).json({message: `Cannot find the product id ${id}`})
        }

        const updatejob =  await Job.findById(id);
        res.status(200).json(updatejob);

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Delete a job

app.delete('/deletejob/:id', async (req, res) => {

    try {
        const {id} =  req.params;
        const findjob = await Job.findByIdAndDelete(id, req.body);

        if(!findjob){
            res.status(404).json({message: `Cannot find the product id ${id}`})
        }

        res.status(200).json(findjob)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})


// New API code

// Login endpoint
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = crypto.randomBytes(32).toString("hex");
      const user = await PatientList.findOne({ email });
  
      if (!user) {
        return res.status(400).json("Invalid User");
      } else if (user.password === password) {
        await PatientList.updateOne({ email }, { $set: { token, lastlogin: new Date() } });
        res.status(200).json({ name: user.firstname, email, token });
      } else {
        res.status(400).json(`Invalid Password: ${email}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Signup endpoint
  app.post("/signup", async (req, res) => {
    try {
      const { firstname, lastname, email, password, dob } = req.body;
  
      const existingPatient = await PatientList.findOne({ email });
      if (existingPatient) {
        return res.status(400).json({ message: "Email already registered." });
      }
  
      const patientlistdata = new PatientList({
        firstname,
        lastname,
        email,
        password,
        dob,
        createdAt: new Date(),
        lastlogin: "",
        active: false,
      });
  
      await PatientList.create(patientlistdata);
      res.status(200).json({ message: "User registered successfully!!" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Email already exists. Please Login" });
      }
      console.error("Error in signup:", error);
      res.status(500).json({ message: error.message });
    }
  });
  


mongoose.connect('mongodb+srv://stevemotif:JEWle0f9UDrbXxzc@webapi.opv3m57.mongodb.net/?retryWrites=true&w=majority&appName=webapi')
.then(() => {

console.log('connected')

app.listen(3005, ()=> {
    console.log(`Node API app is running on 3005`)
})


}).catch((error) => {
    console.log(error)
})