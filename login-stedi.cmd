@echo off
echo Logging in
curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login
curl https://dev.stedi.me/validate/4465b669-49b4-4e07-961f-8a4a5211c363
