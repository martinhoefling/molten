# Molten Screenshots

## Login
![molten-login](/screenshots/molten-login.png?raw=true "molten-login")

## Command Execution and History Tab
![molten-exec-basic](/screenshots/molten-exec-basic.png?raw=true "molten-exec-basic")

The execution window is separated into three blocks to set up the command:
- Client Configuration
- Target Configuration (if applicable, e.g. hidden for 'runner' client)
- Function Configuration with documentation

![molten-exec-doclist](/screenshots/molten-exec-doclist.png?raw=true "molten-exec-doclist") 
Matching functions are shown with a one-line description until exactly determined.

![molten-exec-docdetail](/screenshots/molten-exec-docdetail.png?raw=true "molten-exec-docdetail") 
When the function in the input is valid, the full documentation is shown.

![molten-exec-clientselect](/screenshots/molten-exec-clientselect.png?raw=true "molten-exec-clientselect")
All clients exhibited via API can be used, async clients are selected via additional checkbox in client configuration.

![molten-exec-targetselect](/screenshots/molten-exec-targetselect.png?raw=true "molten-exec-targetselect")
All targeting options are selectable via menu dropdown.

![molten-exec-result](/screenshots/molten-exec-result.png?raw=true "molten-exec-result")
The result of an submitted execution is shown below. In async case, a link to the job result is displayed.

![molten-exec-history](/screenshots/molten-exec-history.png?raw=true "molten-exec-history")
Executed commands can be reviewed and reused from the history tab.

## Job Overview and Details Tab
![molten-job-overview](/screenshots/molten-job-overview.png?raw=true "molten-job-overview")
A list of all jobs with basic information is available via Jobs tab.

![molten-job-details](/screenshots/molten-job-details.png?raw=true "molten-job-details") 
Clicking on any jid displays the job result (if available) and job details.

## Minion Tab
![molten-minion-basic](/screenshots/molten-minion-basic.png?raw=true "molten-minion-basic")
Grains, Pillar and Job history of each Minion can be accessed via the 'Minions' tab. Further, a highstate can be directly triggered for each minion.

## Events Tab and Event Toast Messages
![molten-event-basic](/screenshots/molten-event-basic.png?raw=true "molten-event-basic")
The 'Events' Tab provides an updated view on all events. Locally stored events can be cleared and the event list can be filtered by tag.

![molten-event-toasts](/screenshots/molten-event-toasts.png?raw=true "molten-event-toasts") 
Optionally, all new events can be shown as toast message.
