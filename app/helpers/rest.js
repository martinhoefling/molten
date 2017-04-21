import request from 'superagent';

const SESSION_TEST = {
    client: 'runner',
    fun: 'test.sleep',
    kwargs: {
        s_time: 0
    }
};

function postRequest(url, success, fail, data) {
    request.post(url)
        .set('Accept', 'application/json')
        .withCredentials()
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
        .withCredentials()
        .end(function (err, res) {
            if (err) return fail(err);
            if (res.status !== 200)
                return fail(new Error('Request failed with ' + res.status + ': ' + res.text));
            success(res.body);
        });
}

export function createSession(options, success, fail) {
    postRequest(options.basepath + '/login', success, fail, {
        username: options.username,
        password: options.password,
        eauth: options.eauth
    });
}

export function destroySession(options, success, fail) {
    postRequest(options.basepath + '/logout', success, fail, '');
}

export function getAPI(options, success, fail) {
    getRequest(options.basepath + '/', success, fail);
}

export function postAPI(options, success, fail) {
    postRequest(options.basepath + '/', success, fail, options.lowstate);
}

export function testSession(options, success, fail) {
    options.lowstate = SESSION_TEST;
    return postAPI(options, success, fail);
}

export function obtainDocumentation(options, success, fail) {
    options.lowstate = {
        client: 'runner',
        fun: 'doc.' + options.type
    };
    return postAPI(options, success, fail);
}

export function getMinions(options, success, fail) {
    getRequest(options.basepath + '/minions/', success, fail);
}

export function getMinion(options, success, fail) {
    getRequest(options.basepath + '/minions/' + options.minion, success, fail);
}

export function getJobs(options, success, fail) {
    getRequest(options.basepath + '/jobs/', success, fail);
}

export function getJob(options, success, fail) {
    getRequest(options.basepath + '/jobs/' + options.jid, success, fail);
}
