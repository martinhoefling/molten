#!/usr/bin/env bash
wget -O - https://repo.saltstack.com/apt/debian/8/amd64/latest/SALTSTACK-GPG-KEY.pub | sudo apt-key add -
echo "deb http://repo.saltstack.com/apt/debian/8/amd64/latest jessie main" > /etc/apt/sources.list.d/salt.list
sudo apt-get update
sudo apt-get install -y salt-master salt-minion
rsync -av /vagrant/vagrant/salt/ /etc/salt/
systemctl stop salt-master
systemctl stop  salt-minion
killall salt-master
killall salt-minion
sleep 10
systemctl start salt-master
systemctl start salt-minion
sleep 10
salt-key -y -a themaster
salt-key -L

sleep 15
salt '*' test.ping
salt '*' saltutil.pillar_refresh
salt '*' state.sls testuser
