const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/first-project', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// define users Schema
const usersSchema = new mongoose.Schema({
       name:{
           type:String,
           required: [true, 'You must have to enter your name.'],
        },
        email:  {
         type: String,
         match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
           'Please add a valid email address.',
         ],
         required: [true, 'You must have to enter your Email Address.'],
         unique: true,
         lowercase: true,
       },
        role:{
           type:String,
           required: [true, 'You  must have to enter your role .'],
           lowercase: true,
        },
        
        password:{
           type:String,
           required: [true, 'You  must have to enter a password.'],
        },
        date:{
            type: Date,
            default: Date.now
        }
    });
    const usersModel = mongoose.model('users', usersSchema);
    module.exports=usersModel;