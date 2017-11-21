pipeline {
  agent {
    node {
      label 'console'
    }
  }
  stages {
    stage('Remove images and containers') {
      steps {
        buildStep('Remove images and containers') {
          sh "./.jenkins/setup.sh --shutdown"
        }
      }
    }
    stage('Build Docker image') {
      steps {
        buildStep('Build Docker image') {
          sh "./.jenkins/build.sh ${env.BRANCH_NAME} ${env.BUILD_ID}"
        }
      }
    }
    stage('Setup containers') {
      steps {
        buildStep('Setup containers') {
          sh "./.jenkins/setup.sh --run ${env.BRANCH_NAME} ${env.BUILD_ID}"
        }
      }
    }
    stage('Functional Tests') {
      steps {
        buildStep('Functional Tests') {
          sh "./.jenkins/test.sh"
        }
      }
    }
  }
  post {
    always {
      sh "./.jenkins/setup.sh --shutdown"
    }
  }
}


void buildStep(String message, Closure closure) {
  try {
    setBuildStatus(message, "PENDING");

    closure();

    setBuildStatus(message, "SUCCESS");
  }
  catch (Exception e) {
    setBuildStatus(message, "FAILURE");
    throw e
  }
}

void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/wedeploy/wedeploy.com"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}
