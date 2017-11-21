// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema
var UserSchema = new mongoose.Schema({
name: {type: String, required:true, minlength:4},
polls: [{type:Schema.Types.ObjectId, ref: 'Poll'}]
},{timestamps:true});
// register the schema as a model
var User = mongoose.model('User', UserSchema);