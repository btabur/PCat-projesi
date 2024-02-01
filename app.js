const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');


const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController')

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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//routes
app.get('/', photoController.getAllPhotos );
app.get('/photos/:id',photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
//güncelleme
app.put('/photos/:id', photoController.updatePhoto); 

app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about',pageController.getAboutPage );

app.get('/add', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage);






const port = 3000;

app.listen(port, () => {
  console.log('sunucu başlatıldı');
});
