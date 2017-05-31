var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true 

}));

//Routing
var mainRouter = require('./routes/index');
var apiRouter = require('./routes/api');
app.use('/', mainRouter);
app.use('/api', apiRouter);

//PORT and Database Connection
var PORT = 8000 || process.env.PORT;
var DB = 'localhost:27017/newangular-human';
mongoose.connect(DB, function(err){
    if(err){
        return err;
    }
    else {
        console.log('Successfully connected to ' + DB);
    }
});

//Setting view engine to display the views
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));

//Listen in on the connection
app.listen(PORT, function(){
    console.log('Listening on port ' + PORT);
});