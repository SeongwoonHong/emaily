const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');
const http = require('http');

setInterval(function() {
  http.get('http://frozen-plains-88583.herokuapp.com');
}, 300000);

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true })
const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie can exist. 30days in this case.
    keys: [keys.cookieKey] // if we put more than one, it randomly choose one of them.
  })
);
app.use(passport.initialize()); // tell passport that use the cookie that we defined
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file or main.css file !
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log('Express server running on ' + PORT);
});
