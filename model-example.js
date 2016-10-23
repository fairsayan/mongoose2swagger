const db = require('mongoose');

const schema = db.Schema({
  firstname: {type: String, required: true, trim: true},
  lastname: {type: String, trim: true},
  email: {type: String, required: true, lowercase: true, trim: true},
  passwordHash: String,
  language: String,
  timezone: String,
  imageUrl: String,
  telephone: String,
  policyApproved: Boolean,
  createdAt: { type : Date, default: Date.now }
});

schema.index({firstname: 1, lastname: 1});
schema.index({lastname: 1, firstname: 1});

module.exports = db.model('user', schema);