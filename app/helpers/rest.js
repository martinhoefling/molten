import request from 'superagent';

var SESSION_TEST = {
    client: 'runner',
    fun: 'test.sleep',
    kwargs: {
        s_time: 0
    }
};

module.exports = {
    createSession(options, success, fail) {
        request.post(options.basepath + '/login')
            .set('Accept', 'application/json')
            .type('json')
            .send({
                username: options.username,
                password: options.password,
                eauth: options.eauth
            })
            .end(function (err, res) {
                if (err) return fail(err);
                if (res.status !== 200)
                    return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
                success(res.body);
            });
    },

    destroySession(options, success, fail) {
        request.post(options.basepath + '/logout')
            .set('Accept', 'application/json')
            .type('json')
            .end(function (err, res) {
                if (err) return fail(err);
                if (res.status !== 200)
                    return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
                success(res.body);
            });
    },

    getAPI(options, success, fail) {
        request.get(options.basepath + '/')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) return fail(err);
                if (res.status !== 200)
                    return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
                success(res.body);
            });
    },

    postAPI(options, success, fail) {
        request.post(options.basepath + '/')
            .set('Accept', 'application/json')
            .type('json')
            .send(options.lowstate)
            .end(function (err, res) {
                if (err) return fail(err);
                if (res.status !== 200)
                    return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
                success(res.body);
            });
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
        request.get(options.basepath + '/minions/')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) return fail(err);
                if (res.status !== 200)
                    return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
                success(res.body);
            });
    },

    getMinion(options, success, fail) {
        request.get(options.basepath + '/minions/' + options.minion)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) return fail(err);
                if (res.status !== 200)
                    return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
                success(res.body);
            });
    }
};
