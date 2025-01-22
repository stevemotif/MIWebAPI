const mongoose = require('mongoose');


const patientschema = mongoose.Schema(
    {
firstname : {
    type : String, required : true
},
lastname : {
    type : String, required : true
},
email : {
    type : String, required : true, unique : true
},
password : {
    type : String, required : false
},
token : {
    type : String, required : false
},
dob : {
    type : String, required : false
},
createdAt : {
     type: Date, default: Date.now 
},lastlogin: {
    type: Date, default: Date.now 
},active : {
    type : Boolean, default : false
}

    }
)


const ps = mongoose.model('PatientList', patientschema)

module.exports = ps;