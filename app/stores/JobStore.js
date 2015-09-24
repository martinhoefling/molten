var Fluxxor = require('fluxxor');
var Constants = require('Constants');

var JOB_RET_REGEX=/^salt\/run\/\d{20}\/ret$/;
var JOB_RET_MINION_REGEX=/^salt\/run\/\d{20}\/ret\/(\w+)$/;


function processRawJob(info, result, previousJob) {
    var job = previousJob || { internal: { fetching: false, result: {} } };

    if (info['Result'] && result) {
        delete info['Result'];
    }

    // Assigning info and result
    _.assign(job, info);
    if (result) {
        _.assign(job.internal.result, result);
    }
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
            data;
        if (parsedRawData.tag.match(JOB_RET_REGEX)) {
            data = parsedRawData.data;
            //this.jobs[data.jid] = data;
        } else if (parsedRawData.tag.match(JOB_RET_MINION_REGEX)) {

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

