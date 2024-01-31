const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')

const ejs = require('ejs');
const path = require('path');
const fs = require('fs')
const Photo = require('./models/Photo');

const app = express();

//connect db
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
//alınan requestleri sonlandırır
app.use(express.urlencoded({ extended: true })); //url deki data yı okumamıza yardım eder
app.use(express.json()); //url deki data yı json formatına çevirir
app.use(fileUpload());
app.use(methodOverride('_method'))



//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id)
  // res.render('about')
  const photo = await Photo.findById(req.params.id);

  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos/edit/:id', async(req, res) => {

  const photo = await Photo.findOne({_id:req.params.id})

  res.render('edit',{photo});
});


//güncelleme
app.put('/photos/:id', async(req, res) => {
  const photo = await Photo.findOne({_id:req.params.id});

  photo.title= req.body.title;
  photo.description= req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`)
});

app.post('/photos', async (req, res) => {
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads'

  if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});

const port = 3000;

app.listen(port, () => {
  console.log('sunucu başlatıldı');
});
