pipeline {
  agent {
    node {
      label 'lax'
    }
  }
  stages {
    stage('Clone repository') {
      steps {
        checkout scm
      }
    }
  }
}
