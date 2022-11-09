const mongoose = require('mongoose')



const recipientsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    Subscription_status: {
        type: Boolean,
        required: true,
        default: false
    }

})

module.exports = mongoose.model('Recipients',recipientsSchema)