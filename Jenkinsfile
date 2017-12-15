import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
      junit(allowEmptyResults: true, testResults: 'wedeploy-functional-tests/test-results/TEST-*.xml')
      archiveArtifacts artifacts: 'wedeploy-functional-tests/html-report/*.html'

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
    pushToSlack();
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

String getGitAuthor() {
  def commit = sh(returnStdout: true, script: 'git rev-parse HEAD');
  return sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${commit}").trim();
}

String getLastCommitMessage() {
  return sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim();
}

void pushToSlack() {
  String[] errorMessages = [
    'Hey, Vader seems to be mad at you.',
    'Please! Don\'t break the CI ;/',
    'Houston, we have a problem'
  ];

  String title = "FAILED: Job ${env.JOB_NAME} - ${env.BUILD_NUMBER}";

  JSONArray attachments = new JSONArray();

  attachment = new JSONObject();
  attachment.put('pretext', 'BUILD FAILED - wedeploy/wedeploy.com');
  attachment.put('text', getRandom(errorMessages));
  attachment.put('fallback', 'CI BUILD FAILED');
  attachment.put('color','#ff0000');
  attachment.put('author_name', getGitAuthor());
  attachment.put('title', title);
  attachment.put('title_link', env.BUILD_URL);
  attachment.put('footer', 'WeDeploy CI Team');
  attachment.put('footer_icon', 'https://a.slack-edge.com/7bf4/img/services/jenkins-ci_48.png')

  JSONArray attachmentFields = new JSONArray();

  lastCommitField = new JSONObject();
  lastCommitField.put('title', 'Last Commit');
  lastCommitField.put('value', getLastCommitMessage());
  lastCommitField.put('short', false);

  attachmentFields.add(lastCommitField);

  attachment.put('fields', attachmentFields);

  attachments.add(attachment);

  slackSend (color: '#ff0000', attachments: attachments.toString());
}

String getRandom(String[] array) {
    int rnd = new Random().nextInt(array.length);
    return array[rnd];
}
