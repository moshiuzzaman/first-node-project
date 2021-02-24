const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const usersSchema = new mongoose.Schema({
       name:{
           type:String,
           required: true
        },
        email:{
           type:String,
           required: true,
           index:{
               unique: true
           }},
        role:{
           type:String,
           required: true
        },
        
        password:{
           type:String,
           required: true
        },
        date:{
            type: Date,
            default: Date.now
        }
    });
    const usersModel = mongoose.model('users', usersSchema);
    module.exports=usersModel;