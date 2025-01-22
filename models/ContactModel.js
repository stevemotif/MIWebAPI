const mongoose = require('mongoose')


const ContactSchema =  mongoose.Schema({

    "your-name": {
        type : String
    },
    "your-email": {
        type : String
    },
    "your-subject": {
        type : String
    },
    "your-message": {
        type : String
    },
    "your-number": {
        type : String
    }
})


const Contact =  mongoose.model('Contact',ContactSchema);



module.exports = Contact;
