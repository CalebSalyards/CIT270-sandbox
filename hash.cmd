@echo off
echo Requesting Hash...
set /p "toHash=Enter the text to be hashed: "
curl -d "{\"string\": \"%toHash%\"}" -H "Content-Type:application/json" -X POST http://localhost:3000/hash