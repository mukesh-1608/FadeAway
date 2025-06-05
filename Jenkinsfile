pipeline {
    agent any

    environment {
        // SLACK_TOKEN is typically managed as a Jenkins credential,
        // which you're already using in the post section.
        // No need to define it directly here unless it's an environment variable on the agent.
    }

    stages {
        stage('Declarative: Checkout SCM') { // This stage is usually handled automatically if you don't define it.
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project by installing Node.js dependencies...'
                sh 'npm install' // Installs dependencies defined in package.json
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests for the application...'
                sh 'npm test' // Executes the 'test' script defined in package.json
            }
        }
        stage('Build Docker Image') { // New stage name for clarity
            steps {
                echo 'Building the Docker image...'
                // Build the Docker image with a tag
                sh 'docker build -t fadeaway-app .'
            }
        }
        stage('Run Docker Container') { // New stage for running the container
            steps {
                echo 'Running the Docker container...'
                // First, stop and remove any existing container with the same name
                sh 'docker stop fadeaway-container || true' // '|| true' prevents failure if container doesn't exist
                sh 'docker rm fadeaway-container || true'
                // Then, run the new container
                sh 'docker run -d -p 3000:3000 --name fadeaway-container fadeaway-app'
                echo 'Docker container is running on port 3000.'
            }
        }
    }
    post {
        always {
            script {
                // Slack notification (you can keep it or remove it as you wish)
                // If you want to fix this, ensure 'slack-token' credential is set up correctly in Jenkins
                // and your Jenkins instance can reach Slack API.
                slackSend(channel: '#jenkins-notif', color: 'good', message: "Pipeline ${currentBuild.fullDisplayName} finished: ${currentBuild.currentResult}", tokenCredentialId: 'slack-token', username: 'Jenkins Notif')
            }
        }
    }
}