pipeline {
    agent {
        docker {
            image 'node:8-alpine'
        }
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Audit') {
            steps {
                sh 'cd frontend && npm audit'
                sh 'cd backend && npm audit || true'
            }
        }
        stage('Install dependencies') { 
            steps {
                sh 'cd frontend && npm install'
                sh 'cd backend && npm install'
            }
        }
        stage('Lint') {
            steps {
                sh 'cd frontend && npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'cd frontend && npm test'
                // sh 'cd backend && npm test'
            }
        }
    }

    post {
        always {
            script {
                def notifiedBranch = 'master'
                if (env.BRANCH_NAME == notifiedBranch && currentBuild.currentResult == 'SUCCESS') {
                    slackSend color: "good", message: "Job: ${env.JOB_NAME} with build number ${env.BUILD_NUMBER} was successful. ${env.BUILD_URL}"
                } else if (env.BRANCH_NAME == notifiedBranch && currentBuild.currentResult == 'FAILURE') {
                    slackSend color: "danger", message: "Job: ${env.JOB_NAME} with build number ${env.BUILD_NUMBER} FAILED. ${env.BUILD_URL}"
                }

            }
        }
    }
}