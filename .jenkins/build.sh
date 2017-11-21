#!/bin/bash

CURRENT_DIR=$(pwd)
LOCAL_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
HEAD_COMMIT="$(git rev-parse HEAD)"

BRANCH_NAME="${1:-${LOCAL_BRANCH}}"
BUILD_ID="${2:-${HEAD_COMMIT}}"

main() {
  build_node
}

build_node() {
  cd ${CURRENT_DIR}/node
  docker build -t wedeploy/wedeploy.com:${BRANCH_NAME}-${BUILD_ID} .
}

main "$@"
