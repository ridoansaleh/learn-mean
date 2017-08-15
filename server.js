var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({dest: './assets/uploads/'});
var path = require('path');
var port = process.env.port || 3500;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/gallery');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// declare gallery's schema
	var gallerySchema = new Schema({
	    description: String,
	    image: String
	    // image: {
	    // 	data: Buffer, 
	    // 	contentType: String
	    // }
	});
	// create a model for gallery's schema
	var gallery = mongoose.model('gallery', gallerySchema);

	app.get('/', function (req, res) {
	  res.render('index');
	});

	app.post('/saveData', upload.single('image'), function (req, res) {
		var data = {
			description: req.body.description,
			image: req.file.path
		};
		var newData = new gallery(data);
		newData.save(function(err, newData){
			if (err) return console.error(err);
			console.log("Successfully saved the data");
			// close connection to database
			// mongoose.connection.close();
			res.redirect('/gallery');
		});
		//console.log('files:', req.file.path);
	    //console.log('body:', req.body);
	});

	app.get('/gallery', function (req, res) {
		gallery.find(function (err, gallery) {
			if (err) return console.error(err);
			console.log("gallery : ",gallery);
			res.render('gallery', { data: gallery });
		});
	});

	app.set('views', './views');
	app.set('view engine', 'pug');
	app.use(express.static('./assets'));

	app.listen(port, function () {
	  console.log('Example app running on http://localhost:3500')
	});
});