const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  ); // 패스포트에다가 구글 strategy 호출함.

  app.get('/api/logout', (req, res) => {
    req.logout(); // done by passport
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })
}
