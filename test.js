const m2s = require('./index');
const util = require('util');

const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
});

var swaggerDefinition = m2s.base({
  host: 'localhost'
});

m2s.addSchema(swaggerDefinition, 'customer', mySchema);
console.log(util.inspect(JSON.stringify(swaggerDefinition), false, null));