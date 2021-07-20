/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

// const store = new MongoDBStore({
//   uri: key.MongoDBURI,
//   collection: 'sessions'
// });
const csrfProtection = csrf();

// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03'); 
const ta04Routes = require('./routes/ta04'); 
const ta05Routes = require('./routes/ta05-routes'); 
const prove02Routes = require('./routes/prove02-routes');
const prove03Routes = require('./routes/prove03-routes');
const prove08Routes = require('./routes/prove08-routes');
const prove09Routes = require('./routes/prove09-routes');
const prove10Routes = require('./routes/prove10-routes');
const prove11Routes = require('./routes/prove11-routes');

app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/ta05', ta05Routes)
   .use('/prove02', prove02Routes)
   .use('/prove03', prove03Routes)
   .use('/prove08', prove08Routes)
   .use('/prove09', prove09Routes)
   .use('/prove10', prove10Routes)
   .use('/prove11', prove11Routes)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   })

const server = app.listen(PORT);
const io = require('socket.io')(server)

var dummyData;
function ioUpdate() {
  io.on('update-list', () => {
    dummyData = require('../data/prove11-data.json')
    router.get('/', (req, res, next) => { 
      res.render('pages/prove11', {
          title: 'Team Activity 11',
          path: '/teamActivities/11',
          data: dummyData
      });
  });
    
  })
}
function emitUpdate() {
  io.emit('update-list')
  console.log("emitUpdate called")
}

io.on('connection', (socket) => {
  console.log('Clients connected');

  socket.on('new-name', () => {
    socket.broadcast.emit('update-list');
  });
});

exports.ioUpdate = ioUpdate()
exports.emitUpdate = emitUpdate()
   
