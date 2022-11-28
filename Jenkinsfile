pipeline {
    agent any 
    stages {
        stage('Build') {
            steps {
                echo 'Stage not available'
            }
        }
        stage('Test') {
            steps {
                echo 'Test not available'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }
}