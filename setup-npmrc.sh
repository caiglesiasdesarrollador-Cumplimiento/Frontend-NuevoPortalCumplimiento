#!/bin/bash
echo "registry=https://segurosbolivar.jfrog.io/artifactory/api/npm/bolivar-npm-core-web-kit-components-lib-prod-virtual/" > .npmrc
# Usar variable de entorno si existe, sino usar token por defecto
TOKEN=${JFROG_AUTH_TOKEN:-cmVmdGtuOjAxOjE3OTYzMzM4MTI6ODAyZ25yUXV2YmkyZEdMVXJxNk9uenR0cHZz}
echo "//segurosbolivar.jfrog.io/artifactory/api/npm/bolivar-npm-core-web-kit-components-lib-prod-virtual/:_auth=\"$TOKEN\"" >> .npmrc
echo "always-auth=true" >> .npmrc
