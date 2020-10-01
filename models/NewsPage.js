const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GazeteMansetleriSchema = new Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
    title:{type:String, required:true}, 
    description:{type:String, required:true},
    owner:{type:String},
    name:{type:String, required:true},
    date:{type: String, required:true},
});

module.exports = mongoose.model('gazeteler', GazeteMansetleriSchema);