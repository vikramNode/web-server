var express = require('express');

var app = express();

//adding middleware
var middleware = {
    requireAuth: function(req, res, next){
        var date = new Date;
        console.log(req.method + ' '+ req.originalUrl+' '+ date);
        console.log("Private Route Hit");
        next();
    }
};

app.use(middleware.requireAuth);


//get method accepts two arguments
app.get('/about', function(req, res){
    //res.send('About Us');
    res.sendFile(__dirname +'/public' + '/about.html');
});

app.get('/contact', function(req, res){
    //res.send('About Us');
    res.sendFile(__dirname +'/public' + '/about.html');
});


app.get('/contact', function(req, res){
    //res.send('About Us');
    res.sendFile(__dirname +'/public' + '/about.html');
});

app.use(express.static(__dirname + '/public'));

var port = 3000;

app.listen(port, function(){
    console.log('Port running on '+ port);
}
    );

