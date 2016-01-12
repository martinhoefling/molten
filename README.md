[![Build Status](https://travis-ci.org/martinhoefling/molten.svg)](https://travis-ci.org/martinhoefling/molten)

# Molten - Salt Rest-API WebUI

Molten is a WebUI for the REST API exposed by [Salt](http://saltstack.com/).
Molten aims to make the API features accessible and to provide an easily deployable alternative to the salt commandline cli interfaces.
No additional service besides `salt-api` is required.

<img src='/screenshots/molten-exec-result.png' alt="Molten Execution View" width="480px">

To get a quick impression have a look at the [screenshots](/screenshots/Screenshots.md).

<!-- HEADEND -->

## Features:
* Fast. No page reloads, molten is a SPA (single page app) and keeps state during navigation.
* Full access to all salt clients supported via Rest API. 
* Live updates, e.g. for events, jobs, ...
* Simple deployment: no additional Python / Node.js or Go application required.

## Getting Started:

### Quick Demo

Make sure that [vagrant](https://www.vagrantup.com/) is installed. 
Check out this repository and run `vagrant up demo`. Connect to http://192.168.42.43:8000/molten/ as user test with password molten.

### Configure salt-api
For details, see [salt documentation](https://docs.saltstack.com/en/latest/ref/netapi/all/index.html#all-netapi-modules). Example master config snippet:
```
external_auth:
  pam:
    test:
      - .*
      - '@runner'
      - '@wheel'
      - '@jobs'

rest_cherrypy:
  port: 8000
  host: 0.0.0.0
  debug: True
  disable_ssl: True
  static: /dist
  static_path: /assets
  app: /dist/index.html
  app_path: /molten
```  
Currently, the user must have access to runner/wheel/and jobs. 
Note: It is strongly recommended to either enable SSL encryption for the REST API or to bind the REST API to the loopback interface.

### Install molten
- Extract [release tarball](https://github.com/martinhoefling/molten/releases/download/v0.1.0/molten-0.1.0.tar.gz) to `/dist`.

or

- Build Application ([see below](#build))

### Alternate Installation

Molten can also be served from an alternate host using [CORS](vagrant/example/salt-states/demo.sls). Make sure that config.js points to the correct API location. 
Due to a salt bug, this is only possible from 2015.8.1 onwards.

### Compatibility

Molten should in principle be compatible with all versions that include the netapi. 
- Function documentation is working if master *and* client [versions are at least 2015.8.0](https://github.com/saltstack/salt/pull/25020)
- Serving molten from a different location *without proxy* requires salt master [version to be at least 2015.8.1](https://github.com/saltstack/salt/pull/27826) 

## Contribute:

- Report bugs and feature requests to the issue tracker.
- Pull requests are welcome!

## Development:

### On the shoulders of ...
- React.js
- Redux
- Material-ui
- Webpack
- ... and many others

### <a name="build"></a>Build Application
* install node modules: `npm install`'.
* build application bundle: `npm build`.
* deploy bundle on salt master/api.

### Setup Dev Environment
* install vagrant / virtualbox and node or iojs.
* start webpack bundler `npm run watch`.
* `vagrant up dev` then connect to 192.168.42.42:8000/molten/ as user test with password molten.

