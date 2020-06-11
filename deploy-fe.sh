#!/usr/bin/env bash

echo "> FE 배포"
sudo cp -r /home/ubuntu/issue-tracker/FE/dist/* /var/www/html
