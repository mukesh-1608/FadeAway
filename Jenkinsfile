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
        stage('Run Container') {
            steps {
                script {
                    bat '''
                    docker stop fade-away-chat || echo "No container to stop"
                    docker rm fade-away-chat || echo "No container to remove"
                    timeout /t 10 /nobreak > nul
                    docker run --name fade-away-chat -p 3000:80 -d fade-away-chat:${env.BUILD_ID} || (
                        echo "##[error] Failed to start container"
                        docker logs fade-away-chat --tail 50 2>&1
                        exit 1
                    )
                    echo "Container started successfully"
                    timeout /t 5 /nobreak > nul
                    docker ps -a | findstr "fade-away-chat"
                    '''
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