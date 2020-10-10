const Setting = require('./lib/setting');
new Setting();

exports.Application = require('./lib/application');

exports.ORM = require('./lib/orm').connect;

exports.Logger = require('./lib/logger');