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
                echo "Stopping and removing any existing containers..."
                docker stop fade-app fade-away-chat || exit 0
                docker rm fade-app fade-away-chat || exit 0
                '''
            }
        }

        stage('Run Container') {
            steps {
                script {
                    bat """
                    echo "Starting new container..."
                    docker run --name fade-away-chat -p 3000:80 -d fade-away-chat:${env.BUILD_ID}
                    echo "Container started successfully!"
                    timeout /t 5 > nul
                    docker ps -a
                    """
                }
            }
        }
    }

    post {
        always {
            bat 'docker ps -a'
        }
    }
}