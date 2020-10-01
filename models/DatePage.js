const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TarihteBugunSchema = new Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
    title:{type:String, required:true}, 
    info:{type:String, required:true},
    date:{type:Date, required:true},
});

module.exports = mongoose.model('tarihtebugun', TarihteBugunSchema);