# Molten Screenshots

## Login
![molten-login](/doc/screenshots/molten-login.png?raw=true "molten-login")

## Command Execution and History Tab

The execution window is separated into three blocks to set up the command:
- Client Configuration
- Target Configuration (if applicable, e.g. hidden for 'runner' client)
- Function Configuration with documentation
![molten-exec-basic](/doc/screenshots/molten-exec-basic.png?raw=true "molten-exec-basic")

---


Matching functions are shown with a one-line description until exactly determined.
![molten-exec-doclist](/doc/screenshots/molten-exec-doclist.png?raw=true "molten-exec-doclist") 

---

When the function in the input is valid, the full documentation is shown.
![molten-exec-docdetail](/doc/screenshots/molten-exec-docdetail.png?raw=true "molten-exec-docdetail") 

---

All clients exhibited via API can be used, async clients are selected via additional checkbox in client configuration.
![molten-exec-clientselect](/doc/screenshots/molten-exec-clientselect.png?raw=true "molten-exec-clientselect")

---

All targeting options are selectable via menu dropdown.
![molten-exec-targetselect](/doc/screenshots/molten-exec-targetselect.png?raw=true "molten-exec-targetselect")

---

The result of an submitted execution is shown below. In async case, a link to the job result is displayed.
![molten-exec-result](/doc/screenshots/molten-exec-result.png?raw=true "molten-exec-result")

---

Executed commands can be reviewed and reused from the history tab.
![molten-exec-history](/doc/screenshots/molten-exec-history.png?raw=true "molten-exec-history")


## Job Overview and Details Tab
A list of all jobs with basic information is available via Jobs tab.
![molten-job-overview](/doc/screenshots/molten-job-overview.png?raw=true "molten-job-overview")

---

Clicking on any jid displays the job result (if available) and job details.
![molten-job-details](/doc/screenshots/molten-job-details.png?raw=true "molten-job-details") 

## Minion Tab
Grains, Pillar and Job history of each Minion can be accessed via the 'Minions' tab. Further, a highstate can be directly triggered for each minion.
![molten-minion-basic](/doc/screenshots/molten-minion-basic.png?raw=true "molten-minion-basic")

## Events Tab and Event Toast Messages
The 'Events' Tab provides an updated view on all events. Locally stored events can be cleared and the event list can be filtered by tag.
![molten-event-basic](/doc/screenshots/molten-event-basic.png?raw=true "molten-event-basic")

---

Optionally, all new events can be shown as toast message.
![molten-event-toasts](/doc/screenshots/molten-event-toasts.png?raw=true "molten-event-toasts") 
