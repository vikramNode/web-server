var express = require('express');

var app = express();

var middleware = require('./middleware');

var todos =[
    {
        id:1,
        description:'go to grocery shop',
        complete:false
    },
    {
        id:2,
        description:'go to Mall',
        complete:false
    }
]

app.use(middleware.requireAuth);


app.get('/todos/:id', function(req, res){
    //res.send('About Us');
    //res.sendFile(__dirname +'/public' + '/about.html');
    
    //getting id
    var todoId = parseInt(req.params.id);
        //console.log(todoId);
    var idfound;
    //looping an array items
    todos.forEach(function(v, i){
        console.log(v.id);
        if(v.id === todoId){
            idfound = v;
            //console.log(idfound);
        }
        else{
            //res.status(404).send();
        }
    });
        
        if(idfound){
            res.json(idfound);
        }else{
            res.status(404).send();
            //res.status(404).send();
        }
    
    //res.send('Asking todo id is '+ req.params.id)
});

app.use(express.static(__dirname + '/public'));

var port = 3000;

app.listen(port, function(){
    console.log('Port running on '+ port + ' Running ');
}
    );