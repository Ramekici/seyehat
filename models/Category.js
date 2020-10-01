const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KategorilerSchema = new Schema({
    user:{ type : mongoose.SchemaTypes.ObjectId, ref:'users'},
    category: { type: String, required : true},
    openPos: { type: Boolean, default : false},
    link: { type: String},
    missions: [ {type: String} ],
});

module.exports = mongoose.model('category', KategorilerSchema);