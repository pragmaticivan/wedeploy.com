#!/bin/bash

CURRENT_DIR=$(pwd)

main() {
  setup_tests
  run_tests
}

setup_tests() {
  GIT_REPO_TESTS="https://github.com/wedeploy/console-functional-tests.git"
  rm -rf "${CURRENT_DIR}/console-functional-tests"
  echo "Updating images repository"
  git clone $GIT_REPO_TESTS || true
  cd ${CURRENT_DIR}/console-functional-tests
  git reset --hard
  git pull origin master
}

run_tests() {
  cd ${CURRENT_DIR}/console-functional-tests
  echo "Running tests"
  export LANDING_PAGE_URL=http://localhost:3001
  export DISPLAY=:99.0
  bundle install
  bundle exec cucumber features -t @landing_page -p rerun --format junit --out test-results || cucumber @tmp/rerun.txt --format junit --out test-results
}

main "$@"
