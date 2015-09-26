var Fluxxor = require('fluxxor');
var Constants = require('Constants');

var JOB_RET_REGEX = /^salt\/run\/(\d{20})\/ret$/;
var JOB_RET_MINION_REGEX = /^salt\/job\/(\d{20})\/ret\/(\w+)$/;
var JOB_NEW_REGEX = /^salt\/job\/(\d{20})\/new$/;

var EVENT_KEY_MAP = {
    tgt_type: 'Target-type',
    fun: 'Function',
    tgt: 'Target',
    user: 'User',
    _stamp: 'StartTime',
    arg: 'Arguments',
    fun_args: 'Arguments',
    minions: 'Minions'
};

function processRawJob(info, result, previousJob) {
    var job = previousJob || { internal: { fetching: false, result: {} } };

    if (info['Result'] && result) {
        delete info['Result'];
    }

    Object.keys(info).forEach(function (key) {
        if (EVENT_KEY_MAP[key]) {
            info[EVENT_KEY_MAP[key]] = info[key];
            delete info[key];
        }
    });

    // Assigning info and result
    _.assign(job, info);
    if (result) {
        _.assign(job.internal.result, result);
    }
    console.log(job);
    return job;
}

var JobStore = Fluxxor.createStore({
    initialize() {
        this.jobs = {};
        this.fetchingJobs = false;
        this.bindActions(
            Constants.GET_JOBS, this.fetchingJobsStarted,
            Constants.GET_JOBS_SUCCESS, this.jobsLoaded,
            Constants.SERVER_EVENT_RECEIVED, this.serverEventReceived,
            Constants.GET_JOB, this.fetchingJobStarted,
            Constants.GET_JOB_SUCCESS, this.jobLoaded
        );
    },

    fetchingJobsStarted() {
        this.fetchingJobs = true;
        this.emit('change');
    },

    fetchingJobStarted(jid) {
        var job = this.jobs[jid] || { internal: { fetching: false, result: {} } };
        job.internal.fetching = true;
        this.jobs[jid] = job;
        this.emit('change');
    },

    fetchingJobsInProgress() {
        return this.fetchingJobs;
    },

    fetchingJobInProgress(jid) {
        return !!(this.jobs[jid] && this.jobs[jid].internal.fetching);
    },

    jobsLoaded(rawJobInfo) {
        var job;
        this.fetchingJobs = false;
        Object.keys(rawJobInfo.return[0]).forEach(function (key) {
            job = rawJobInfo.return[0][key];
            job['jid'] = key;
            this.jobs[key] = processRawJob(job, null, this.jobs[key]);
        }.bind(this));
        this.emit('change');
    },

    jobLoaded(rawJobInfo) {
        var jobInfo = rawJobInfo.info[0];
        var result = rawJobInfo.return[0].data;
        this.jobs[jobInfo.jid] = processRawJob(jobInfo, result, this.jobs[jobInfo.jid]);
        this.jobs[jobInfo.jid].internal.fetching = false;
        this.emit('change');
    },

    serverEventReceived(rawEvent) {
        var parsedRawData = JSON.parse(rawEvent.data),
            data = parsedRawData.data,
            jid, minion;
        if (parsedRawData.tag.match(JOB_RET_REGEX)) {
            jid = parsedRawData.tag.match(JOB_RET_REGEX)[1];

            this.jobs[jid] = processRawJob(_.omit(data, ['return']), data.return, this.jobs[jid]);
        } else if (parsedRawData.tag.match(JOB_RET_MINION_REGEX)) {
            [jid, minion] = parsedRawData.tag.match(JOB_RET_MINION_REGEX).splice(1);
            this.jobs[jid] = processRawJob(_.omit(data, ['return', 'id']), { [minion]: data.return }, this.jobs[jid]);
        } else if (parsedRawData.tag.match(JOB_NEW_REGEX)) {
            jid = parsedRawData.tag.match(JOB_NEW_REGEX)[1];
            this.jobs[jid] = processRawJob(data, null, this.jobs[jid]);
        }
    },

    getJobs() {
        return _.keys(this.jobs).map(key => (this.getJob(key)));
    },

    getJobResult(jid) {
        return this.jobs[jid].internal.result;
    },

    getJob(jid) {
        return _.omit(this.jobs[jid], ['internal']);
    }
});

module.exports = JobStore;

