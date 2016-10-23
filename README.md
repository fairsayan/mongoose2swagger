# mongoose2swagger
generation of swagger document based on mongoose schema

mongoose2swagger is intended to be the documentation part of express-restify-mongoose [https://florianholzapfel.github.io/express-restify-mongoose/#getting-started].
It generates an object compliant with Swagger 2.0 specifications

# usage
const m2s = require('mongoose2swagger');
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

# methods

## base(data, [options])
It creates the base structure of swagger document
### data object
host - required
title (default: "name" in package.json)
description (default: "description" in package.json)
version (default: "version" in package.json)
### options object
packageJson path of package.json used for default values (default: './package.json')

## addSchema(base, schemaName, schema)
It appends new endpoints based on mongoose schema
### base object
the base structure of swagger document
### schemaName
the name of the endpoints
### schema
mongoose schema object