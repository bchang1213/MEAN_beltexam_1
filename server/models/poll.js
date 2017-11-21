// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema
var PollSchema = new mongoose.Schema({
question: {type: String, required:true, minlength:4},
option1 : {
	answer: {type: String},
	votes: {type: Number, default : 0}
},
option2 : {
	answer: {type: String},
	votes: {type: Number, default :0}
},
option3 : {
	answer: {type: String},
	votes: {type: Number, default:0}
},
option4 : {
	answer: {type: String},
	votes: {type: Number, default:0}
},
user: [{type:Schema.Types.ObjectId, ref:"User"}]
},{timestamps:true});
// register the schema as a model
var Poll = mongoose.model('Poll', PollSchema);