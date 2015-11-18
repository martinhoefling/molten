import _ from 'lodash';

import Constants from 'Constants';

export const MODE = {
    ASYNC: 'async',
    BATCH: 'batch',
    NONE: null
};

function Client(name) {
    this.name = name;
    this.modes = [];
    this.mode = null;
}

_.assign(Client.prototype, {
    addMode(mode) {
        this.modes.push(mode);
    },

    hasMode(mode) {
        return _.contains(this.modes, mode);
    },

    setMode(mode) {
        if (mode && this.hasMode(mode)) {
            this.mode = mode;
        } else if (!mode) {
            this.mode = null;
        }
    },

    getMode() {
        return this.mode;
    },

    allowsTargeting() {
        return ['local', 'ssh'].indexOf(this.name) > -1;
    },

    getDocType() {
        if (['local', 'ssh'].indexOf(this.name) > -1) {
            return Constants.DOCUMENTATION_TYPE.EXECUTE;
        }
        if (this.name === 'wheel') {
            return Constants.DOCUMENTATION_TYPE.WHEEL;
        }
        if (this.name === 'runner') {
            return Constants.DOCUMENTATION_TYPE.RUNNER;
        }
        return null;
    },

    getFullName() {
        return this.name + (this.mode ? ('_' + this.mode) : '');
    },

    getName() {
        return this.name;
    }
});

export function getClients(clientStringList) {
    var clients = {};
    clientStringList.forEach(function (clientString) {
        if (clientString[0] === '_') {
            return;
        }
        var split = clientString.split('_');
        var name = split[0];
        if (!(name in clients)) {
            clients[name] = new Client(name);
        }
        if (split.length > 1) {
            clients[name].addMode(split[1]);
        }
    });
    return _.values(clients);
}
