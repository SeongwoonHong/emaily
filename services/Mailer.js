const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    if (process.env.NODE_ENV === 'production') {
      this.sgApi = sendgrid(keys.sendGridKeyProd);
    } else {
      this.sgApi = sendgrid(keys.sendGridKey);
    }
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); // built-in function that inherits from helper.Mail class
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() { // by doing this, sendgrid can replace some of the link in the email with identified some stuff to distinguish who is who
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize); // built-in function from helper.Mail class
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON() // build in function from sendgrid
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}


module.exports = Mailer;
