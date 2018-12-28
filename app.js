const express = require('express');
const app = express();
let port = 3000;
// Serve public dir to send html with css at same time
app.use(express.static("public"));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://admin:6j07oAIZq4P5@ds245234.mlab.com:45234/rsvp_db';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let RsvpSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    isComing: {type: String, required: true},
});

var Rsvp = mongoose.model("Rsvp", RsvpSchema);

app.post("/rsvp", (req, res) => {
    var entry = new Rsvp(req.body);
    console.log(req.body);
    entry.save(function  (err ) {
        if (err) {
            return console.error(err);
        }
        res.send("Your response has been sent");
    });
});