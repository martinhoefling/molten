var Fluxxor = require('fluxxor');
var Constants = require('Constants');

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
        var job = this.jobs[jid] || {};
        if (!job.internal) {
            job.internal = {};
        }
        job.internal.fetching = true;
        this.jobs[jid] = job;
        this.emit('change');
    },

    fetchingJobsInProgress() {
        return this.fetchingJobs;
    },

    fetchingJobInProgress(jid) {
        return !!(this.jobs[jid] && this.jobs[jid].internal && this.jobs[jid].internal.fetching);
    },

    jobsLoaded(rawJobInfo) {
        _.assign(this.jobs, rawJobInfo.return[0]);
        this.fetchingJobs = false;
        this.emit('change');
    },

    jobLoaded(rawJobInfo) {
        var jobInfo = rawJobInfo.info[0];
        var result = rawJobInfo.return[0];
        this.jobs[jobInfo.jid] = _.omit(jobInfo, ['Result']);
        this.jobs[jobInfo.jid].internal = { result };
        this.emit('change');
    },

    serverEventReceived(event) {
        console.log('implement event handling' + event);
    },

    getJobs() {
        return _.keys(this.jobs).map(key => (this.getJob(key)));
    },

    getJobInternals(jid) {
        return _.defaultsDeep(this.jobs[jid] || {}, { internal: { fetching: false, result: null } }).internal;
    },

    getJobResult(jid) {
        return this.getJobInternals(jid).result;
    },

    getJob(jid) {
        return _.assign(_.omit(this.jobs[jid], ['internal']), { jid: jid });
    }
});

module.exports = JobStore;

