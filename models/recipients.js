const mongoose = require('mongoose')

const validator=require("validator")


const recipientsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Subscription_status: {
        type: String,
        enum: ["True", "False"],
        default: "False"
    }

})

module.exports = mongoose.model('Recipients',recipientsSchema)