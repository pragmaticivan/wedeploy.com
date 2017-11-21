#!/bin/bash

CURRENT_DIR=$(pwd)

main() {
  setup_tests
}

setup_tests() {
  GIT_REPO_TESTS="https://github.com/wedeploy/console-functional-tests.git"
  rm -rf "${CURRENT_DIR}/console-functional-tests"
  echo "Updating images repository"
  cd ${CURRENT_DIR}/console-functional-tests
  git reset --hard
  git pull origin master
}

run_tests() {
  cd ${CURRENT_DIR}/console-functional-tests
  echo "Temp test"
}

main "$@"
