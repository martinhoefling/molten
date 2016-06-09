#!/usr/bin/env bash
echo "deb http://repo.saltstack.com/apt/debian/latest jessie main" > /etc/apt/sources.list.d/salt.list
wget -q -O- "https://repo.saltstack.com/apt/debian/latest/SALTSTACK-GPG-KEY.pub" | apt-key add -
sudo apt-get update
sudo apt-get install -y salt-master salt-minion
rsync -av /vagrant/vagrant/salt/ /etc/salt/
systemctl stop salt-master
systemctl stop  salt-minion
systemctl start salt-master
systemctl start salt-minion
sleep 10
salt-key -y -a themaster
salt-key -L

sleep 15
salt '*' test.ping
salt '*' saltutil.pillar_refresh
salt '*' state.sls testuser
