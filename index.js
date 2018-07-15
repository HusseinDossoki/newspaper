const path        = require('path');
const bodyParser  = require('body-parser');
const express     = require('express');
const exhb        = require('express-handlebars');
const mongoose    = require('mongoose');
const cors        = require('cors');
const passport    = require('passport');
const session     = require('express-session');

const databaseConfig = require('./config/database');


// define the app
const app = express();


// define cors
app.use(cors());


// connect to database
mongoose.connect(databaseConfig.database, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
  console.log('connected to database....');
});
mongoose.connection.on('error', (err) => {
  console.log(`error while connecting to database: ${err}`);
});


// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exhb({defaultLayout: 'layout', extname: 'hbs'}));


// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// set static folder
app.use(express.static(path.join(__dirname, 'public')));


// session
app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


// defines routes
const articleRoute = require('./routes/article');
const userRoute = require('./routes/user');
app.use('/', articleRoute);
app.use('/user', userRoute);


// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is starting on port 3000....');
});
