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

// Photo.create({
//   tittle: 'Photo tittle 2',
//   description: 'Photo desc 2',
// });

//read

// Photo.find().then((data)=> {
//   console.log(data)
// })
const id = '65b93c505115e6d6c3f87ceb';
//update
// 

// Photo.findByIdAndUpdate(
//   id,
//   {
//     tittle: 'Photo uptaded 2 ',
//     description: 'Desc uptated 2 ',
//   },
//   { new: true }   // güncellenen veriyi döndürmesi için
// ).then((res) => console.log(res));


//delete

Photo.findByIdAndDelete(id).then(()=> console.log('silme islemi yapıldı') )