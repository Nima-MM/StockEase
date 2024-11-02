#!/usr/bin/env groovy

pipeline {
  agent any

  environment {
    JAVA_HOME = "${tool 'openjdk-17'}"
    PATH = "${JAVA_HOME}/bin:${env.PATH}"
  }

  stages {
    stage('checkout') {
      steps {
        checkout scm
      }
    }

    stage('check java') {
      steps {
        sh "java -version"
      }
    }

    stage('clean') {
      steps {
        sh 'chmod +x mvnw'
        sh './mvnw -ntp clean -P-webapp'
      }
    }
    stage('nohttp') {
      steps {
        sh './mvnw -ntp checkstyle:check'
      }
    }

    stage('install tools') {
      steps {
        sh './mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v14.15.0 -DnpmVersion=6.14.11'
      }
    }

    stage('npm install') {
      steps {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm"
      }
    }

    stage('backend tests') {
      steps {
          sh './mvnw -ntp verify -P-webapp'
          //junit '**/target/test-results/**/TEST-*.xml'
      }
    }

    stage('packaging') {
      steps {
        sh './mvnw -ntp verify -P-webapp -Ppre -DskipTests'
        archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
      }
    }

    stage('publish docker') {
      steps {
        sh './mvnw -ntp jib:buildTar'
      }
    }

    stage('run application') {
      steps {
        sh """
         docker-compose -f ${WORKSPACE}/target/classes/sm-docker/app.yml rm -sfv stockmanagement-app || true
         docker rmi stockmanagement || true
         docker load --input ${WORKSPACE}/target/jib-image.tar
         docker-compose -f ${WORKSPACE}/target/classes/sm-docker/app.yml up -d
        """
      }
    }
  }
}
