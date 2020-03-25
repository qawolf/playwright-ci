pipeline {
    agent {
        docker {
            image 'qawolf/playwright-ci:v0.7.0'
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                // // Start local server
                // sh 'npm run start & npx wait-on http://localhost:3000'
                // replace below with command you want to run, example for running a script below
                // sh 'node myScript.js'
                sh 'npm test'
            }
        }
    }
}