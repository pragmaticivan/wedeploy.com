#!/bin/bash

CURRENT_DIR=$(pwd)
LOCAL_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
HEAD_COMMIT="$(git rev-parse HEAD)"

BRANCH_NAME="${2:-${LOCAL_BRANCH}}"
BUILD_ID="${3:-${HEAD_COMMIT}}"

main() {
  case $1 in
  --run)
    run_infrastructure
    ;;

  --shutdown)
    shutdown_infrastructure
    ;;

  *)
    echo "Error:
  Unknown command.
  Usage: exploded-infra-runner.sh [--conqueror|--run|--shutdown]
  Aborting."
    exit 1
    ;;
  esac
}

run_infrastructure() {
  docker run -p 3001:3001 -d wedeploy/wedeploy.com:${BRANCH_NAME}-${BUILD_ID}
}

shutdown_infrastructure() {
  remove_containers
  remove_images
}

remove_containers() {
  local containers=$(docker ps \
    --quiet \
    --all)

  echo "INFO:
  Removing containers.
  "

  test -z "$containers" ||
    docker rm --force --volumes $containers
}

remove_images() {
  local images=$(docker images \
    --all \
    --quiet)

  echo "INFO:
  Removing images.
  "

  test -z "$images" ||
    docker rmi --force $images || true
}

main "$@"
