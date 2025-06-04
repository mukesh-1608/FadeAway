pipeline {
    agent any

    environment {
        // Replace with the ID you used to store your Slack bot token in Jenkins credentials (Secret Text)
        SLACK_TOKEN = credentials('slack-token')
        SLACK_CHANNEL = '#jenkins-notif'   // Replace with your actual Slack channel
        SLACK_BOT_NAME = 'Jenkins Notif'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add your actual build commands here
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test steps here
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add deployment steps here
            }
        }
    }

    post {
        failure {
            script {
                slackSend(
                    channel: env.SLACK_CHANNEL,
                    tokenCredentialId: 'slack-token',
                    message: "*❌ Build Failed!* \nJob: `${env.JOB_NAME}`\nBuild: #${env.BUILD_NUMBER}\nURL: ${env.BUILD_URL}",
                    username: env.SLACK_BOT_NAME
                )
            }
        }

        success {
            script {
                slackSend(
                    channel: env.SLACK_CHANNEL,
                    tokenCredentialId: 'slack-token',
                    message: "*✅ Build Succeeded!* \nJob: `${env.JOB_NAME}`\nBuild: #${env.BUILD_NUMBER}\nURL: ${env.BUILD_URL}",
                    username: env.SLACK_BOT_NAME
                )
            }
        }
    }
}
