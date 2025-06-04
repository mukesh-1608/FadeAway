pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/yourusername/fade-away-chat.git',
                credentialsId: 'github-creds'
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
                    sh 'docker stop fade-away-chat || true'
                    sh 'docker rm fade-away-chat || true'
                    docker.image("fade-away-chat:${env.BUILD_ID}").run(
                        "--name fade-away-chat -p 3000:80 -d"
                    )
                }
            }
        }
    }
}