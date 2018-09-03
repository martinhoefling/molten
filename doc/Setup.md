# Configuration

## Setting up via [molten-formula](https://github.com/martinhoefling/molten-formula)

This is the recommended way to set up molten, if you haven't already configured the salt-api.

## Manual Setup
For setup detail of the Salt netapi, see [salt documentation](https://docs.saltstack.com/en/latest/ref/netapi/all/index.html#all-netapi-modules). 

Example master config snippet:
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
  static: /opt/molten
  static_path: /assets
  app: /opt/molten/index.html
  app_path: /molten
```

Currently, the user (`test` in the above example) must have access to runner/wheel/and jobs.
Note: It is strongly recommended to either enable SSL encryption for the REST API or to bind the REST API to the loopback interface.

### Install Molten on Salt Master
- Extract [release tarball](https://github.com/martinhoefling/molten/releases/download/v0.3.1/molten-0.3.1.tar.gz) to `/opt/molten`.


or

- Build Application ([see Development](/doc/Development.md))

### Alternate Installation on different host

Molten can also be served from an alternate host (e.g. localhost) using [CORS](vagrant/example/salt-states/demo.sls).
Make sure that `API_BASE_URL` in `config.js` points to the correct API URL.
Due to a salt bug, this kind of setup is only possible from 2015.8.1 onwards.
