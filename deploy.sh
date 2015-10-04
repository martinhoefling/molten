#!/bin/bash -eux
npm run-script build-dev
rsync -av dist/ $1
