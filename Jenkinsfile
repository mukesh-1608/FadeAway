pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/mukesh-1608/FadeAway.git',
                    credentialsId: 'e1eebe1b-334b-4600-92c4-480a8e015668'
            }
        }

        stage('Install Dependencies and Test') {
            steps {
                bat '''
                echo Installing Node.js dependencies...
                if exist node_modules (echo Dependencies already installed) else (npm install)
                echo Running Tests...
                npm test
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("fade-away-chat:${env.BUILD_ID}")
                }
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                bat '''
                echo Cleaning up old containers...
                docker stop fade-away-chat || echo "No running container to stop"
                docker rm fade-away-chat || echo "No container to remove"
                '''
            }
        }

        stage('Run Container') {
            steps {
                bat """
                echo Running new container...
                docker run --name fade-away-chat -d -p 3000:80 fade-away-chat:${env.BUILD_ID}
                """
            }
        }
    }

    post {
        success {
            bat 'echo Build Succeeded! && docker ps -a'
            // Uncomment below for Slack notifications (after Slack setup)
            // slackSend(channel: '#your-channel', message: "✅ Build #${env.BUILD_NUMBER} succeeded.")
        }
        failure {
            bat 'echo Build Failed!'
            // Uncomment below for Slack notifications (after Slack setup)
            // slackSend(channel: '#your-channel', message: "❌ Build #${env.BUILD_NUMBER} failed.")
        }
    }
}