var Fluxxor = require('fluxxor');
var _ = require('lodash');
var _s = require("underscore.string");

var Constants = require('Constants');
var DocumentationStore = Fluxxor.createStore({
    initialize() {
        this.documentation = {};
        this.error = null;

        this.bindActions(
            Constants.GET_DOCUMENTATION, this.setDocumentation,
            Constants.GET_DOCUMENTATION_SUCCESS, this.setDocumentationSuccess,
            Constants.GET_DOCUMENTATION_FAIL, this.setDocumentationFail
        );
    },

    setDocumentation(type) {
        this.documentation[type] = null;
        this.emit('change');
    },

    getFunctionDocumentation(type, funcstr) {
        if (!funcstr) {
            return 'No function specified';
        }
        if (funcstr.split('.').length !== 2) {
            return 'Incomplete function specified';
        }
        var doc = this.documentation;

        return (doc && doc[type] && doc[type][funcstr])
            || 'documentation not loaded or no documentation found for ' + funcstr;
    },

    searchFunctionDocumentation(type, funcstr) {
        if (!this.documentation[type]) {
            return 'documentation not loaded';
        }
        var doc = this.documentation[type];

        var funcs = _.keys(doc).filter(function (modfunc) {
            return _s.startsWith(modfunc, funcstr);
        });

        if (_.contains(funcs, funcstr)) {
            return this.getFunctionDocumentation(type, funcstr);
        }

        if (funcs.length) {
            var docs = funcs.map(func => this._oneline(doc[func]));
            return _.zipObject(funcs, docs);
        }

        return 'no documentation found for ' + funcstr;
    },

    _oneline(doc) {
        var lines = _s.lines(doc).map(line => _s.clean(line));
        var filterUntilEmpty = false;
        lines = lines.filter(function (line) {
            if (!line) {
                filterUntilEmpty = false;
                return false;
            }
            if (_.startsWith(line, 'New in version')) {
                filterUntilEmpty = true;
                return false;
            }
            if (_.startsWith(line, '.. versionadded')) {
                filterUntilEmpty = true;
                return false;
            }
            if (_.startsWith(line, 'Note:')) {
                filterUntilEmpty = true;
                return false;
            }
            return !filterUntilEmpty;
        });

        lines = lines.filter(line => line);
        return lines[0];
    },

    _parseDocumentation(raw) {
        var parsed = {};
        for (var prop in raw) {
            var doc = raw[prop];
            parsed[prop] = _s.strip(doc);
        }
        return parsed;
    },

    setDocumentationSuccess(payload) {
        this.documentation[payload.type] = this._parseDocumentation(payload.documentation.return[0]);
        this.emit('change');
    },

    setDocumentationFail(error) {
        console.log(error);
    },

    getAvailableDocumentation() {
        return _.keys(this.documentation);
    }
});

module.exports = DocumentationStore;

