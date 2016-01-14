[![Build Status](https://travis-ci.org/martinhoefling/molten.svg)](https://travis-ci.org/martinhoefling/molten)

# Molten - Salt Rest-API WebUI

Molten is a WebUI for the REST API exposed by [Salt](http://saltstack.com/).
Molten aims to make the API features accessible and to provide an easily deployable alternative to the salt cli interface.
No additional service besides `salt-api` is required.

<img src='/doc/screenshots/molten-exec-result.png' alt="Molten Execution View" width="720px">

To get a quick impression have a look at the [screenshots](/doc/Screenshots.md).

<!-- HEADEND -->

## Features:
* Fast. No page reloads, molten is a SPA (single page app) and keeps state during navigation.
* Full access to all salt clients supported via Rest API.
* Live updates, e.g. for events, jobs, ...
* Job history and rescheduling of jobs
* Simple deployment: no additional Python / Node.js or Go application required.

## Getting Started:

### Quick Demo

Make sure that [vagrant](https://www.vagrantup.com/) is installed.

Check out this repository init git submodules and start virtual machine via vagrant:

```
git clone https://github.com/martinhoefling/molten.git
cd molten
git submodule init
git submodule update
vagrant up demo
```

Connect to http://192.168.42.43:8000/molten/ as user test with password molten.

### [Configuration](/doc/Setup.md)

### Compatibility

Molten should in principle be compatible with all salt versions that include the netapi.
- Function documentation is working if master *and* client [versions are at least 2015.8.0](https://github.com/saltstack/salt/pull/25020)
- Serving molten from a different location *without proxy* requires salt master [version to be at least 2015.8.1](https://github.com/saltstack/salt/pull/27826)

## Contribute:

- Report bugs and feature requests to the issue tracker.
- Pull requests are welcome!

## [Development](/doc/Development.md)
