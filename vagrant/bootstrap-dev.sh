#!/usr/bin/env bash
echo "deb http://repo.saltstack.com/apt/debian jessie contrib" > /etc/apt/sources.list.d/salt.list
wget -q -O- "https://repo.saltstack.com/apt/debian/SALTSTACK-GPG-KEY.pub" | apt-key add -
sudo apt-get update
sudo apt-get install -y salt-master salt-api salt-minion
rsync -av /vagrant/vagrant/salt/ /etc/salt/
service salt-master stop
service salt-minion stop
service salt-api stop
service salt-api stop
service salt-master start
service salt-minion start
service salt-api start
sleep 5
salt-key -y -a themaster
sleep 5
salt-key -L
salt '*' test.ping
useradd test
echo test:molten | chpasswd
