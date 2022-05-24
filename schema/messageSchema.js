const mongoose = require('mongoose');

const {Schema} = mongoose;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender:{
        type: String,
        required: true
    },
    receiver:{
        type: String,
        required: true
    }
})

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;
