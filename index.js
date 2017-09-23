const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie can exist. 30days in this case.
        keys: [keys.cookieKey] // if we put more than one, it randomly choose one of them.
    })
);
app.use(passport.initialize()); // tell passport that use the cookie that we defined
app.use(passport.session());
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log('Express server running on ' + PORT);
});
