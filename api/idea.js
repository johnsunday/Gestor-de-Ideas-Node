const express    = require('express');
const bodyParser = require('body-parser');
const moment     = require('moment');
const app = express();
const mongoose = require('mongoose');
const configdb = require('./../configdb');

const idea = require('./../data/schemas/ideaschema');

const path = require('path');

//Defino static
//app.use(express.static('../public'));

app.use('/public', express.static(__dirname + '/../public'));


//Conectamos a la DB.
mongoose.connect(configdb.db.url);


// parse body as json

app.use(bodyParser.json());


// all requests

app.use((req, res, next) => {

    console.log(`${req.method}: ${req.path} - ${moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)}`);

    next();

});

// get home

/*app.get('/', (req, res) => {
     idea.find( (err, ideas) => {
       if (err) {
           next(new Error(err));
       }else{
           res.json(ideas);
            }
       });
});*/

console.log("Adding routes...")
//app.use('./../public', express.static(__dirname + '../public/'));

// api
app.get('/api/ideas', (req, res) => {
        idea.find(function(err, ideas){
          if (err)
            res.send(err)
            res.json(ideas); // return all todos in JSON format

          });


    });

    app.get('/', (req, res) => {
            idea.find(function(err, ideas){
              if (err)
                res.send(err)
                res.sendFile((path.resolve(__dirname + '/../public/index.html')))

                //res.json(ideas); // return all todos in JSON format

              });


        });


// get clients by id

/*app.get('/api/ideas/:id', (req, res) => {

    let idea = idea.find(i => i.id == req.params.id);

    if(idea) {

        res.json(idea);

    } else {

        res.status(404).end();
    }
});*/


// add new idea - Content Type: json
app.post('/api/ideas', (req, res) => {
  var myData = new idea(req.body);
  myData.save()
  .then(item => {
    res.status(201).send(req.body);
    })
  .catch(err => {
    res.status(400).send(err);
  });
});



app.delete('/api/ideas/:id', (req, res) => {

    _ideas = _ideas.filter(i => i.id != req.params.id);
    res.status(204).end();

});

console.log("Routes Added!")

//app.get('*', function(req, res) {
//      res.sendFile('../public/index.html');
//  });

console.log("Index cargado")


// start server
app.listen(process.env.PORT || 3000, function () {

    console.log('API andando con express...');

});
