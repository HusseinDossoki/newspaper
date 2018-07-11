const path        = require('path');
const bodyParser  = require('body-parser');
const express     = require('express');
const exhb        = require('express-handlebars');
const mongoose    = require('mongoose');
const cors        = require('cors');

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


// defines routes
const articleRoute = require('./routes/article');
app.use('/', articleRoute);


// start the server
app.listen(3000, () => {
  console.log('Server is starting on port 3000....');
});