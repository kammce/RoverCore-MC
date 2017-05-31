#!/bin/bash

function SystemExit()
{
	echo "Exiting Script" 1>&2
	exit 1
}

# Make sure only non-root users can run our script
if [[ $EUID -eq 0 ]]; then
	echo -n "RoverCoreV2 installer script must NOT be run as root! " 1>&2
	echo -n "." 1>&2
	sleep 1
	echo -n "." 1>&2
	sleep 1
	echo -n "." 1>&2
	sleep 1
	echo " So try again!" 1>&2
	exit 1
fi

# Commented out because 2017 rover does not use the udev rules
# echo "Installing rover udev rules (video and bluetooth identifiers) into /etc/udev/rules.d"
# cp install/udev-rules/rover.rules /etc/udev/rules.d

echo "Need sudo privileges to run script."
sudo echo "" || SystemExit

echo -e "\n Installing Build Essentials"
sudo apt-get install -y build-essential

# Adding Node Source Repository to Apt-Get
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

echo -e "\n Installing NodeJS"
sudo apt-get install -y nodejs npm

echo -e "\n Installing Apache2"
sudo apt-get install -y apache2

echo -e "\n Changing ownership of folder to $USER"
sudo chown $USER:$USER /var/www/html

echo -e "\n Install RoverCore MC NPM Dependencies"
npm install .
echo -e "\n NPM Install Grunt Command Line Interface"
sudo npm install -g grunt-cli
echo -e "\n NPM Install Mocha Command Line Interface"
sudo npm install -g mocha-cli

# Kill sudo timestamp
sudo -k
