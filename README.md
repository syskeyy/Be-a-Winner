# Web_Systems

This is a React web application using a local MongoDB server
Be a winner! - Coursework

Instructions to setup on Linux (Debian based instructions):
- sudo apt-get install git-all
- git clone https://github.com/syskeyy/Web_Systems.git
- cd Web_Systems/
- cd Be-A-Winner/
- sudo chmod 777 script.sh
- Run Bash Script: ./script.sh

Upgrading to NodeJS version 21 has not worked for me in the past, I have included the command that fixes this, (removed libnode-dev). Bash Script contains the following commands:

- sudo apt-get install gnupg curl
- curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
- echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
- sudo apt-get update
- sudo apt-get install -y mongodb-org
- sudo systemctl enable mongod
- sudo systemctl start mongod
- sudo dpkg --remove --force-remove-reinstreq libnode-dev
- sudo apt install nodejs npm
- sudo apt install curl
- curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash 
- sudo apt-get install -y nodejs 
- npm install
- npm run dev

