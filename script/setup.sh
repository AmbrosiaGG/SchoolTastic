#!/bin/bash

clear
echo "
   _____      __                ________           __  _     
  / ___/_____/ /_  ____  ____  / /_  __/___ ______/ /_(_)____
  \__ \/ ___/ __ \/ __ \/ __ \/ / / / / __  / ___/ __/ / ___/
 ___/ / /__/ / / / /_/ / /_/ / / / / / /_/ (__  ) /_/ / /__  
/____/\___/_/ /_/\____/\____/_/ /_/  \__,_/____/\__/_/\___/  
                                                                                                                                       
  Welcome to the SchoolTastic Installation Wizard!
"

echo "[ ! ] Installing Pre-Requsisites..."
apt update -y
apt upgrade -y
apt install unzip

echo "[ ! ] Downloading SchoolTastic files..."
trap 'echo "**[ ! ] Download interrupted. Exiting..." ; exit' INT
curl -sSL https://github.com/AmbrosiaGG/SchoolTastic/archive/refs/heads/main.zip > SchoolTastic.zip
trap - INT
unzip SchoolTastic.zip
rm SchoolTastic.zip
mv SchoolTastic-main SchoolTastic
cd SchoolTastic

echo "️[ ! ] Configuring environment..."
read -p "MongoDB URL (e.g., mongodb://admin:password@example.com:port/?authSource=admin): " atlas
read -p "Session Secret (it'll be encrypted, so make sure to save the encrypted password): " session
read -p "Port number (default: 3000): " port
port=${port:-3000} 
read -p "Auto Update (true/false, default: true): " updates
updates=${updates:true}  
read -p "Your School title: " title
read -p "Remote SSH Password: " pass

echo "atlas=$atlas" >> .env
echo "session=$session" >> .env
echo "port=$port" >> .env
echo "updates=$updates" >> .env
echo "title=$title" >> .env
echo "ssh=$pass" >> .env


echo "[ ! ] Gearing up for Bun installation..."
curl -fsSl https://bun.sh/install | bash
source /root/.bashrc

echo "[ ! ] Installing SchoolTastic dependencies..."
bun i

echo "[ ! ] Launching SchoolTastic with pm2..."
pm2 start --interpreter ~/.bun/bin/bun index.js --name "SchoolTastic" -- -color
sleep 5

echo "[ ! ] SchoolTastic is ready! You can manage it using pm2 commands."
echo "[ ! ] Access the webpage on http://localhost:$(sed -n '3p' .env | cut -d '=' -f2)"
echo "[ ! ] with credentials: "
echo "[ * ] - Username: admin"
echo "[ * ] - Password: $(cat initialAdminPassword.txt) make sure you save this."
echo "[ * ] - the password will be saved on ./SchoolTastic/initialAdminPassword.txt" 
exit 0
