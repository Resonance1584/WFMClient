/**
 * Loads templates from 'templates' directory
 * and compiles them with Handlebars returning
 * an object keyed by the template filename.
 *
 * E.g server.action.subaction.format.xml will
 * be returned as
 * {
 *  server: {
 *   action: {
 *    subaction: {
 *     format: {
 *      xml
 *     }
 *    }
 *   }
 *  }
 * }
 *
 * Where xml is a compiled Handlebars template
 * function for server.action.subaction.format.xml
 *
 * Or to be more useful: task.create({taskId: id})
 *
 */
'use strict';

var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

var templates = {};

//Templates are loaded from ./templates
var templateDir = path.join(__dirname, 'templates');
var templateNames = fs.readdirSync(templateDir);

templateNames.forEach(function (templateName) {
  var template = fs.readFileSync(path.join(templateDir, templateName), 'utf8');
  var compiledTemplate = Handlebars.compile(template);

  var templateParts = templateName.split('.');

  //Pointer to object / nested object in templates
  var obj = templates;

  //Loop over each . separated component
  while (templateParts.length >= 1) {
    var part = templateParts.shift();

    if (templateParts.length === 0) {
      //If this is the last part store the
      //Handlebars compiled template in the
      //property we last created
      obj[part] = compiledTemplate;
    } else {
      //Ensure that an object exists for
      //this property
      obj[part] = obj[part] || {};
    }

    //Move pointer one property deeper
    obj = obj[part];
  }

});

module.exports = templates;
