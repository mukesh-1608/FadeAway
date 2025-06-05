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
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests for the application...'
                bat 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                bat 'docker build -t fadeaway-app .'
            }
        }
        stage('Run Docker Container') {
            steps {
                echo 'Running the Docker container...'
                // Attempt to stop and remove previous container.
                // '2>NUL' suppresses error messages. '|| exit /b 0' ensures the batch command
                // itself doesn't fail if docker stop/rm command returns an error (e.g., container not found).
                bat 'docker stop fadeaway-container 2>NUL || exit /b 0'
                bat 'docker rm fadeaway-container 2>NUL || exit /b 0'

                // THIS IS THE MISSING LINE: Add a small delay to ensure the port is completely freed by Docker
                bat 'timeout /t 5' // This waits for 5 seconds

                // Now run the new container
                bat 'docker run -d -p 3000:3000 --name fadeaway-container fadeaway-app'
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