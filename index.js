const EJS = require('ejs');
const fs = require('fs');
const _ = require('lodash');

/***
  * @param Object (required: host)
  * @param {
      packageJson: String if null => it doesn't load package.json (default: 'package.json')
  * }
  * @return Object swagger
  */
exports.base = function (data, options) {
  if (typeof options === 'undefined') options = {};
  if (typeof options.packageJson === 'undefined') options.packageJson = './package.json';
  var general = fs.readFileSync('general.json', 'utf-8');

  if (options.packageJson !== null) {
    const packageJson = require(options.packageJson);
    const infoFromPackageJson = {
      name: 'title',
      version: 'version',
      description: 'description'
    };

    for (var packageAttr in infoFromPackageJson) {
      var info = infoFromPackageJson[packageAttr];
      if (typeof data[info] === 'undefined') data[info] = packageJson[packageAttr];
    }
  }
  return JSON.parse(EJS.render(general, data));
};

/***
  * @param json base
  * @param Mongoose schema
  */
exports.addSchema = function (base, schemaName, schema) {
  const objName = _.startCase(schemaName);
  if (typeof base.paths === 'undefined') base.paths = {};
  if (typeof base.definitions === 'undefined') base.definitions = {};

  var definition = {
    properties: {},
    required: []
  };
  
  for (var fieldName in schema.paths) {
    if (['_id', '__v'].indexOf(fieldName) !== -1) continue; // skip these fields

    var field = schema.paths[fieldName];
    if (field.options.required) definition.required.push(fieldName);
    var type = field.instance.toLowerCase();
    if (['date', 'objectid'].indexOf(type) !== -1) type = 'string';
    definition.properties[fieldName] = {type: type};
  }
  
  if (definition.required.length === 0) definition.required = undefined;
  base.definitions['New' + objName] = definition;

  definition = JSON.parse(JSON.stringify(definition)); // cloning definition
  if (!definition.required) definition.required = [];
  definition.properties['_id'] = {type: 'string'};
  definition.required.push('_id');
  base.definitions[objName] = definition;

  var path = fs.readFileSync('path.json', 'utf-8');
  var pathId = fs.readFileSync('pathId.json', 'utf-8');
  var pathIdShallow = fs.readFileSync('pathIdShallow.json', 'utf-8');
  const pathName = schemaName.toLowerCase();
  base.paths['/' + pathName] = JSON.parse(EJS.render(path, {
    objName: objName,
    path: pathName
  }));
  base.paths['/' + pathName + '/{id}'] = JSON.parse(EJS.render(pathId, {
    objName: objName,
    path: pathName
  }));
  base.paths['/' + pathName + '/{id}/shallow'] = JSON.parse(EJS.render(pathIdShallow, {
    objName: objName,
    path: pathName
  }));
};