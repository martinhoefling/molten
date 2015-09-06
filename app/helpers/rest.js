import request from 'superagent';

var SESSION_TEST = {
    client: 'runner',
    fun: 'test.sleep',
    kwargs: {
        s_time: 0
    }
};

function postRequest(url, success, fail, data) {
    request.post(url)
        .set('Accept', 'application/json')
        .type('json')
        .send(data)
        .end(function (err, res) {
            if (err) return fail(err);
            if (res.status !== 200)
                return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
            success(res.body);
        });
}

function getRequest(url, success, fail) {
    request.get(url)
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if (err) return fail(err);
            if (res.status !== 200)
                return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
            success(res.body);
        });
}

module.exports = {
    createSession(options, success, fail) {
        postRequest(options.basepath + '/login', success, fail, {
            username: options.username,
            password: options.password,
            eauth: options.eauth
        });
    },

    destroySession(options, success, fail) {
        postRequest(options.basepath + '/logout', success, fail, '');
    },

    getAPI(options, success, fail) {
        getRequest(options.basepath + '/', success, fail);
    },

    postAPI(options, success, fail) {
        postRequest(options.basepath + '/', success, fail, options.lowstate);
    },

    testSession(options, success, fail) {
        options.lowstate = SESSION_TEST;
        return this.postAPI(options, success, fail);
    },

    obtainDocumentation(options, success, fail) {
        options.lowstate = {
            client: 'runner',
            fun: 'doc.' + options.type
        };
        return this.postAPI(options, success, fail);
    },

    getMinions(options, success, fail) {
        getRequest(options.basepath + '/minions/', success, fail);
    },

    getMinion(options, success, fail) {
        getRequest(options.basepath + '/minions/' + options.minion, success, fail);
    }
};
