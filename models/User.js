const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  displayName: String,
  email: Array
});

mongoose.model('users', userSchema);

// It's better not to use require here as it might cause problems in testing development.
