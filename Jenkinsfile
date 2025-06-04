pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/mukesh-1608/FadeAway.git',
                credentialsId: 'e1eebe1b-334b-4600-92c4-480a8e015668'  // Your actual credential ID
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