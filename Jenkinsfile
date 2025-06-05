pipeline {
    agent any

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project by installing Node.js dependencies...'
                bat 'npm install' // Changed from sh to bat
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests for the application...'
                bat 'npm test' // Changed from sh to bat
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                bat 'docker build -t fadeaway-app .' // Changed from sh to bat
            }
        }
        stage('Run Docker Container') {
            steps {
                echo 'Running the Docker container...'
                // Changed from sh to bat for both commands
                bat 'docker stop fadeaway-container || true'
                bat 'docker rm fadeaway-container || true'
                bat 'docker run -d -p 3000:3000 --name fadeaway-container fadeaway-app'
                echo 'Docker container is running on port 3000.'
            }
        }
    }
    post {
        always {
            script {
                slackSend(channel: '#jenkins-notif', color: 'good', message: "Pipeline ${currentBuild.fullDisplayName} finished: ${currentBuild.currentResult}", tokenCredentialId: 'slack-token', username: 'Jenkins Notif')
            }
        }
    }
}