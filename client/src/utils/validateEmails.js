// eslint-disable-next-line
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails, isMultiple = false) =>{
  let invalidEmails;
  if (!isMultiple) {
    invalidEmails = regex.test(emails.trim());
  } else {
    invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => !regex.test(email));
  }
  if (isMultiple && invalidEmails.length) {
    return `These emails are invalid :${invalidEmails} (delimiter: comma)`;
  }
  if (!isMultiple && !invalidEmails) {
    return `Invalid email. Please try again`;
  }
  return;
}
