const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connectDb
// mongoose.connect('mongodb://localhost/pcat-test-db');

//mongoose.connect('mongodb://localhost:27017/pcat-test-db');
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');




//create schema

const PhotoSchema = new Schema({
  tittle: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//create a photo

Photo.create({
  tittle: 'Photo tittle 1',
  description: 'Photo desc 1',
});
