const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RsvpSchema = new Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    isComing: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Product', RsvpSchema);