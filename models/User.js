const mongoose = require('mongoose');
const uniqueValidator= require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', UserSchema);
