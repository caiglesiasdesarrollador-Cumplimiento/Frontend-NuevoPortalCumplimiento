#!/bin/bash
echo "registry=https://segurosbolivar.jfrog.io/artifactory/api/npm/bolivar-npm-core-web-kit-components-lib-prod-virtual/" > .npmrc
echo "//segurosbolivar.jfrog.io/artifactory/api/npm/bolivar-npm-core-web-kit-components-lib-prod-virtual/:_authToken=$JFROG_AUTH_TOKEN" >> .npmrc
echo "always-auth=true" >> .npmrc
