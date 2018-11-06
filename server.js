const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;



var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
     var now = new Date().toString();
     var log = `${now}: ${req.method} ${req.url}`;

     console.log(log);
     fs.appendFileSync('server.log', log + '\n')
     next();
});




hbs.registerHelper('getCurrentYear', () => {
    //return 'test';
    return new Date ().getFullYear()
});


hbs.registerHelper('screamIt', (text) => {
    
    return text.toUpperCase();
});


app.get('/',(req, res) =>{
    // res.send('<h1>Hello express!</h1>');
    res.send({
   name: 'shady',
   likes: ['biking','cities']


    });
});

app.get('/home',(req, res) =>{
    res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'Welcome Home',
 });
});
app.get('/about',(req, res) =>{
     res.render('about.hbs',{
      pageTitle:'About Page',
  });
});



app.get('/bad',(req, res) =>{
    res.send({
    errorMassage: 'unable to handle request'
});
});


app.listen(port, () =>{
       console.log(`server is up on port ${port}`);
});