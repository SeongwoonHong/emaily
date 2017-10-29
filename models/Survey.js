const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  sender: String,
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // ref 부분 이해잘 안감.
  dateSent: Date,
  lastResponded: Date,
  totalNumber: Number
});

mongoose.model('surveys', surveySchema);
