const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerilerSchema = new Schema({
    user:{type:mongoose.SchemaTypes.ObjectId, ref:'users'},
    category:{type:String, required:true},
    mission:{type:String, required:true}, 
    name:{type:String, required:true},
    surName:{type:String, required:true},
    start:{type:Date, required:true}, 
    end:{type:Date, required:true},
    date:{type: Date, default: Date.now},
});

module.exports = mongoose.model('data', VerilerSchema);
