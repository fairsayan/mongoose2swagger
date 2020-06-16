const m2s = require('./index');
const util = require('util');

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const fs = require('fs');

const mySchema = new mongoose.Schema({
  firstname: {type: String, required: true, trim: true},
  lastname: {type: String, trim: true},
  appName: {type: String, required: true, default: 'timeshift'},
  email: {type: String, required: true, lowercase: true, trim: true},
  passwordHash: {type: String, access: 'private'},
  authenticationSystem: {type: String, access: 'private'},
  passwordSetToken: {type: String, access: 'private'},
  language: {type: String, required: true, default: 'en'},
  imageUrl: String,
  phone: String,
  policyApproved: Boolean,
  isAdmin: Boolean,
  activities: [{type: ObjectId, ref: 'activity'}], // proxy value from activity collection (members.user): it shouldn't be edited directly
  lastLogin: Date,
  bounces: {type: Number, required: true, default: 0},
  thumbnails: { type: 'Mixed' }
}, {
  timestamps: true,
  id: false,
  swagger: {
    tag: {
      description: 'this is a swagger schema'
    }
  }
});

var swaggerDefinition = m2s.base({
  host: 'localhost:8001',
  basePath: '/api'
}, {
  packageJson: './package.json'
});

m2s.addSchema(swaggerDefinition, 'user', mySchema);
console.log(util.inspect(JSON.stringify(swaggerDefinition), false, null));
fs.writeFileSync('./ui/test.json', JSON.stringify(swaggerDefinition));