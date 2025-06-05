pipeline {
    agent any

    // Removed the empty 'environment {}' block as it causes an error
    // If you need environment variables later, add them here:
    /*
    environment {
        MY_VAR = 'some-value'
    }
    */

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project by installing Node.js dependencies...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests for the application...'
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                sh 'docker build -t fadeaway-app .'
            }
        }
        stage('Run Docker Container') {
            steps {
                echo 'Running the Docker container...'
                sh 'docker stop fadeaway-container || true' // Stop if already running
                sh 'docker rm fadeaway-container || true'   // Remove if exists
                sh 'docker run -d -p 3000:3000 --name fadeaway-container fadeaway-app'
                echo 'Docker container is running on port 3000.'
            }
        }
    }
    post {
        always {
            script {
                // Slack notification (you can keep it or remove it)
                // Ensure 'slack-token' credential is set up correctly in Jenkins
                slackSend(channel: '#jenkins-notif', color: 'good', message: "Pipeline ${currentBuild.fullDisplayName} finished: ${currentBuild.currentResult}", tokenCredentialId: 'slack-token', username: 'Jenkins Notif')
            }
        }
    }
}