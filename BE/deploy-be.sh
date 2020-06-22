#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/issue-tracker/BE
cd $REPOSITORY

APP_NAME=issue-tracker
JAR_NAME=$(basename $REPOSITORY/build/libs/*.jar)
JAR_PATH=$REPOSITORY/build/libs/$JAR_NAME

CURRENT_PID=$(pgrep -f $APP_NAME)
CURRENT_GRADLE_PID=$(pgrep -f GradleDaemon)

if [ -z $CURRENT_PID ]
then
  echo "> 종료할것 없음."
else
  echo "> kill -9 $CURRENT_PID"
  kill -9 $CURRENT_PID
  sleep 5
fi

echo "> $JAR_PATH 배포"
nohup java -jar -Dspring.profiles.active=production -Djasypt.encryptor.password=everjay $JAR_PATH &

if [ -z $CURRENT_GRADLE_PID ]
then
	echo "> 종료할 것 없음"
else
	echo "kill $CURRENT_GRADLE_PID"
	kill -9 $CURRENT_GRADLE_PID
	sleep 5
fi
