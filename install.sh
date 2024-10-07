#!/bin/bash

case "$1" in
    nglamp)
        echo "Installing NGLAMP..."
        sudo apt-get update
        sudo apt-get install -y nginx apache2 php mysql-server
        ;;
    lamp)
        echo "Installing LAMP..."
        sudo apt-get update
        sudo apt-get install -y apache2 php mysql-server
        ;;
    nlamp)
        echo "Installing NLAMP..."
        sudo apt-get update
        sudo apt-get install -y nginx php mysql-server
        ;;
    plesk)
        echo "Installing Plesk..."
        wget -O - https://autoinstall.plesk.com/one-click-installer | sh
        ;;
    cpanel)
        echo "Installing CPanel..."
        cd /home
        curl -o latest -L https://securedownloads.cpanel.net/latest && sh latest
        ;;
    virtualmin)
        echo "Installing Virtualmin..."
        wget http://software.virtualmin.com/gpl/scripts/install.sh
        sudo /bin/sh install.sh
        ;;
    nodejs)
        echo "Installing Node.js..."
        sudo apt update
        sudo apt install -y nodejs npm
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        source ~/.bashrc
        nvm install node 
        ;;
    *)
        echo "Invalid server type selected."
        exit 1
        ;;
esac
