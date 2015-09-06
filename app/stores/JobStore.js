var Fluxxor = require('fluxxor');
var Constants = require('Constants');

var JobStore = Fluxxor.createStore({
    initialize() {
        this.jobs = {};
        this.fetchingJobs = false;
        this.bindActions(
            Constants.GET_JOBS, this.fetchingJobsStarted,
            Constants.GET_JOBS_SUCCESS, this.jobsLoaded,
            Constants.SERVER_EVENT_RECEIVED, this.serverEventReceived
        );
    },

    fetchingJobsStarted() {
        this.fetchingMinions = true;
    },

    fetchingJobsInProgress() {
        return this.fetchingJobs;
    },

    jobsLoaded(rawJobInfo) {
        _.assign(this.jobs, rawJobInfo.return[0]);
        this.fetchingJobs = false;
        this.emit('change');
    },

    serverEventReceived(event) {
    },

    getJobs() {
        return _.keys(this.jobs).map(key => (_.assign(this.jobs[key], { id: key })));
    }
});

module.exports = JobStore;

