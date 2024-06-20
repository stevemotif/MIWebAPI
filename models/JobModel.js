const mongoose = require("mongoose");

const jobschema = mongoose.Schema(
  {
    job_title: {
      type: String,
      required: [true, "Please enter a job title"]
    },
    job_type: {
      type: String,
      required: [true, "Please enter Job Type"]
    },
    salary: {
      type: Number,
      required: [true, "Please enter Salary Range"]
    },
    jobdesc: {
      type: String,
      required: [true, "Please enter Job Description"]
    },
    jobresp: {
        type: String,
        required: [true, "Please enter Job Responsibilities"]
    },
    jobstatus: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobschema);

module.exports = Job;
