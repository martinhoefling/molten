// required for Object.assign
import 'babel-polyfill';

var context = require.context('.', true, /.+\.spec\.jsx?$/);
context.keys().forEach(context);
jasmine.Ajax.install();

export default context;
