var context = require.context('.', true, /.+\.spec\.jsx?$/);
context.keys().forEach(context);
jasmine.Ajax.install();

module.exports = context;
