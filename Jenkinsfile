pipeline {
  agent {
    node {
      label 'lax'
    }
  }
  stages {
    stage('Build Docker image') {
      steps {
        cd node
        def app = docker.build("wedeploy/wedeploy.com:${env.BRANCH_NAME}-${env.BUILD_ID}")
      }
    }
  }
}
