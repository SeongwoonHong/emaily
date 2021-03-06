const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false })
      .sort({dateSent: -1});

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('<h1>We appreciate your opinion!</h1><h2>Thank you!</h2>');
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map((event) => {
        const pathname = new URL(event.url).pathname;
        const match = p.test(pathname); // either be object or null
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact() //it returns only event objects not undefined.
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false}
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true }, // $ comes from elemMatch code above.
          lastResponded: new Date()
        }).exec();
      })
      .value();
    res.send({});

  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { sender, title, subject, body, recipients } = req.body;
    const survey = new Survey({
      sender,
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      totalNumber: recipients.split(' ').length,
      dateSent: Date.now()
    });

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey), sender);
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save(); // 세이브 하고난후에 기존의 req.user가 stale해짐 그래서 새로운 user variable에다가 저장.

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post('/api/surveys/:surveyId', requireLogin, (req, res) => {
    const { surveyId } = req.params;
    Survey.findByIdAndRemove(surveyId, (err, result) => {
        return res.send([result]); // 이게왜 어레이여야 되지..?? 이해안감. 어레이아니면 에러남;; 그리고 얘 리턴 안하면 바로 적용안됨. 왜그런지..
    })
  })
};
