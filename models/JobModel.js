const mongoose = require("mongoose");

const jobschema = mongoose.Schema(
  {
    job_title: {
      type: String,
      required: [false, "Please enter a job title"]
    },
    job_type: {
      type: String,
      required: [false, "Please enter Job Type"]
    },
    salary: {
      type: Number,
      required: [false, "Please enter Salary Range"]
    },
    jobdesc: {
      type: String,
      required: [false, "Please enter Job Description"]
    },
    jobresp: {
        type: String,
        required: [false, "Please enter Job Responsibilities"]
    },
    jobstatus: {
      type: Boolean,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobschema);

module.exports = Job;
