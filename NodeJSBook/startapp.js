var express = require('express');
var app = express();
var fortune = require('./lib/fortunes.js');

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({
	defaultLayout : 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

//This is to perform unit testing. If query params include test =1 then unit tests are executed?? and displayed. 
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
	                    req.query.test === '1';
	            next();
	});


app.get('/', function(req, res) {
	res.render('home');
});
app.get('/about', function(req, res) {
	var randomFortune = fortune.getFortune();
	res.render('about', {
		fortune : randomFortune
	});
});
// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port')
			+ '; press Ctrl-C to terminate.');
});