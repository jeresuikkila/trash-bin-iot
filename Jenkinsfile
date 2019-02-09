pipeline {
    agent {
        docker {
            image 'node:8-alpine' 
            args '-p 3000:3000' 
        }
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Audit') {
            steps {
                sh 'cd frontend && npm audit'
                sh 'cd backend && npm audit'
            }
        }
    }
}