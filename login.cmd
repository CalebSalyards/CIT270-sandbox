@echo off
echo Logging in
curl --insecure -d "@login.json" -X POST -H "Content-Type:application/json" https://salyards.cit270.com/login
@REM curl https://dev.stedi.me/validate/4465b669-49b4-4e07-961f-8a4a5211c363
