const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getFullYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (message)=>{
  return message.toUpperCase();
});

app.use((req, res, next)=>{
  var now = new Date().toString();
  var logs = `${now} ${req.method} ${req.url}`;
  console.log(logs);
  fs.appendFile('server.log', logs + '\n',(error)=>{
    if(error){
      console.log(error);
    }
  });
  next();
});

/*app.use((req, res, next)=>{
  res.render('maintenance.hbs')
});
*/
app.get('/', (req, res) =>{
//res.send('<h1> Hi Express on node <h1>')
//app.use('/static', express.static(path.join(__dirname, 'public')));
/*
res.send(
      {
        name : "Some Name",
        age  : "Age",
        like : [
          "Cricket",
          "golf"
        ]
      }
    )
    */

    res.render('home.hbs', {
      pageTitle : 'Home Page',
      welcomeMsg : 'Welcome Guest ..!!!'
    })
});

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle : 'About Page'
  })
})

app.get('/projects', (req,res)=>{
  res.render('projects.hbs',{
    pageTitle : 'Projects'
  })
})


app.get('/bad', (req, res) => {
  res.send({

        errorcode : "123",
        errorMessage : "Some Error Msg",
        errorDesc : "Error Description"

  })
})

app.listen(port,()=>{
  console.log(`server is up and running on port ${port}`);
});
