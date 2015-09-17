[![Build Status](https://travis-ci.org/martinhoefling/molten.svg)](https://travis-ci.org/martinhoefling/molten)

# Molten - Salt Rest-API WebUI

Molten is a WebUI for the REST API exposed by [Salt](http://saltstack.com/).
Aim is to make the API features accessible and to provide an easily deployable alternative to the salt cli interface.
No additional service besides `salt-api` is required.

## Features:
* Full access to all salt clients supported via Rest API.
* Simple deployment: no intermediate Python / Node.js application required.
* Live updates, e.g. for events, jobs, minions...
* No page reloads, molten is a SPA (single page app).

## Getting Started:

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
  app_path: /dist
```  
Currently, the user must have access to runner/wheel/and jobs.

### Install molten
- Extract [release tarball](https://github.com/martinhoefling/molten/releases/download/v0.1.0pre1/molten-0.1.0pre1.tar.gz) to `/dist`.

or

- Build Application ([see below](#build))

## Contribute:

- Report bugs and feature requests to the issue tracker.
- Pull requests are welcome!

## Development:

### On the shoulders of ...
- React.js
- Fluxxor
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
* `vagrant up` then connect to 192.168.42.42:8000 as test / molten.

