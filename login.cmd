@echo off
echo Logging in
curl --insecure -d "@login.json" -X POST -H "Content-Type:application/json" salyards.cit270.com
@REM curl https://dev.stedi.me/validate/4465b669-49b4-4e07-961f-8a4a5211c363
