# Web_Systems
Be a winner! - Coursework

Instructions to setup:
- sudo apt-get install git-all
- git clone https://github.com/syskeyy/Web_Systems.git
- cd Web_Systems/
- cd Be-A-Winner/
- Run Bash Script (./script.sh)

Upgrading to NodeJS version 21 has not worked for me in the past, I have included the command that fixes this, (removed libnode-dev)
Bash Script contains the following commands:

- sudo dpkg --remove --force-remove-reinstreq libnode-dev
- sudo apt install nodejs npm
- sudo apt install curl
- curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash 
- sudo apt-get install -y nodejs 
- npm install
- npm run dev

You can use the following users if you'd like (username:password):
- test:test
- test1:test1
- test2:test2

In the event that the mongoDB server does not connect, you can do the following changes:
- In user.js, prize.js, luckynumbers.js change the URI value to mongodb://127.0.0.1:27017.
Create a new directory for the database then run the following commands:
- sudo apt-get install gnupg curl
- curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
- echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
- sudo apt-get update
- sudo apt-get install -y mongodb-org
- sudo systemctl enable mongod
- sudo systemctl start mongod
- mongosh

Then go back to Be-A-Winner directory, and run script again (./script.sh)

