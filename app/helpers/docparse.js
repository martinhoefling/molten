import _ from 'lodash';
import _s from 'underscore.string';

function _getFunctionDocumentation(documentation, type, funcstr) {
    if (!funcstr) {
        return 'No function specified';
    }
    if (funcstr.split('.').length !== 2) {
        return 'Incomplete function specified';
    }
    var doc = documentation;

    return (doc && doc[type] && doc[type][funcstr])
        || 'documentation not loaded or no documentation found for ' + funcstr;
}

function _oneline(doc) {
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
}

export function searchFunctionDocumentation(documentation, type, funcstr) {
    if (!documentation[type]) {
        return 'documentation not loaded';
    }
    var doc = documentation[type];

    var funcs = _.keys(doc).filter(function (modfunc) {
        return _s.startsWith(modfunc, funcstr);
    });

    if (_.contains(funcs, funcstr)) {
        return _getFunctionDocumentation(documentation, type, funcstr);
    }

    if (funcs.length) {
        var docs = funcs.map(func => _oneline(doc[func]));
        return _.zipObject(funcs, docs);
    }

    return 'no documentation found for ' + funcstr;
}
