const Product = require("../models/ProductModel");
const Job = require("../models/JobModel");
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");

//app.use(express.json());

router.get("/", (req, res) => {
  res.send("Hello node api is running");
});

// Post a job request
router.post("/addjob", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(200).json(job);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get job by id
router.get("/job/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://stevemotif:JEWle0f9UDrbXxzc@webapi.opv3m57.mongodb.net/?retryWrites=true&w=majority&appName=webapi"
  )
  .then(() => {
    console.log("connected to MongoDB");
   // console.log(process.env.NODE_ENV);
    
    // Only start the server if not running in serverless environment
    if (process.env.NODE_ENV !== "production") {
      app.listen(3005, () => {
        console.log(`Node API app is running on port 3005`);
      });
    }
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

  app.use("/", router);


app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);
