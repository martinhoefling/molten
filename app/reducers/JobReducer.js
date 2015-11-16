var Constants = require('Constants');
var _ = require('lodash');

var JOB_RET_REGEX = /^salt\/run\/(\d{20})\/ret$/;
var JOB_RET_MINION_REGEX = /^salt\/job\/(\d{20})\/ret\/(.+)$/;
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
    if (info['Result'] && result) {
        delete info['Result'];
    }

    Object.keys(info).forEach(function (key) {
        if (EVENT_KEY_MAP[key]) {
            info[EVENT_KEY_MAP[key]] = info[key];
            delete info[key];
        }
    });

    return Object.assign({}, previousJob, info);
}

const initialState = {
    jobs: {},
    fetchingJobsInProgress: false,
    jobsBeingFetched: {},
    jobResults: {}
};

function jobReducer(state = initialState, action) {
    var jobs, jobInfo, parsedRawData, data, jid, minion;
    switch (action.type) {
        case Constants.GET_JOBS:
            return Object.assign({}, state, { fetchingJobsInProgress: true});
        case Constants.GET_JOBS_SUCCESS:
            jobs = Object.assign({}, state.jobs);
            Object.keys(action.jobList.return[0]).forEach(function (key) {
                jobInfo = action.jobList.return[0][key];
                jobInfo['jid'] = key;
                jobs[key] = processRawJob(jobInfo, null, state.jobs[key]);
            });
            return Object.assign({}, state, {
                fetchingJobsInProgress: false,
                jobs
            });
        case Constants.SERVER_EVENT_RECEIVED:
            parsedRawData = JSON.parse(action.event.data);
            data = parsedRawData.data;
            if (parsedRawData.tag.match(JOB_RET_REGEX)) {
                jid = parsedRawData.tag.match(JOB_RET_REGEX)[1];
                jobInfo = processRawJob(_.omit(data, ['return']), true, state.jobs[jid]);
                return Object.assign({}, state, {
                    jobs: Object.assign({}, state.jobs, { [jid]: jobInfo }),
                    jobResults: Object.assign({}, state.jobResults, { [jid]: data.return })
                });
            } else if (parsedRawData.tag.match(JOB_RET_MINION_REGEX)) {
                [jid, minion] = parsedRawData.tag.match(JOB_RET_MINION_REGEX).splice(1);
                jobInfo = processRawJob(_.omit(data, ['return', 'id']), true, state.jobs[jid]);
                return Object.assign({}, state, {
                    jobs: Object.assign({}, state.jobs, { [jid]: jobInfo }),
                    jobResults: Object.assign({}, state.jobResults, {
                        [jid]: Object.assign({}, state.jobResults[jid], { [minion]: data.return })
                    })
                });
            } else if (parsedRawData.tag.match(JOB_NEW_REGEX)) {
                jid = parsedRawData.tag.match(JOB_NEW_REGEX)[1];
                jobInfo = processRawJob(data, null, state.jobs[jid]);
                return Object.assign({}, state, {
                    jobs: Object.assign({}, state.jobs, { [jid]: jobInfo })
                });
            } else {
                return state;
            }
        case Constants.GET_JOB:
            return Object.assign({}, state, {
                jobsBeingFetched: Object.assign({}, state.jobsBeingFetched, { [action.jid]: true })
            });
        case Constants.GET_JOB_SUCCESS:
            jobInfo = action.job.info[0];
            var result = action.job.return[0].data;
            return Object.assign({}, state, {
                jobsBeingFetched: Object.assign({}, state.jobsBeingFetched, { [action.jid]: false }),
                jobs: Object.assign(
                    {},
                    state.jobs,
                    { [action.jid]: processRawJob(jobInfo, result, state.jobs[jobInfo]) }
                ),
                jobResults: Object.assign({}, state.jobResults, { [action.jid]: result })
            });
        default:
            return state;
    }
}

module.exports = jobReducer;
