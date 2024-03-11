# Web_Systems
Be a winner! - Coursework

Instructions to setup:
- sudo apt-get install git-all
- git clone https://github.com/syskeyy/Web_Systems.git
- cd Web_Systems/
- cd Be-A-Winner/
- Run Bash Script

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
