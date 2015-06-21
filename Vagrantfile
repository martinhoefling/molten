Vagrant.configure(2) do |config|
  config.vm.box = "debian/jessie64"
  config.vm.box_check_update = false
  config.vm.network "private_network", ip: "192.168.42.42"
  config.vm.synced_folder "./dist", "/dist"
  config.vm.provider "virtualbox" do |vb|
   vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    echo "deb http://debian.saltstack.com/debian jessie-saltstack main" > /etc/apt/sources.list.d/salt.list
    wget -q -O- "http://debian.saltstack.com/debian-salt-team-joehealy.gpg.key" | apt-key add -
    sudo apt-get update
    sudo apt-get install -y salt-master salt-api salt-minion
    cp /vagrant/dev/salt/master/custom.conf /etc/salt/master.d/
    cp /vagrant/dev/salt/minion/custom.conf /etc/salt/minion.d/
    service salt-master stop
    service salt-minion stop
    service salt-api stop
    salt-key -y -a vagrant
    salt-key
    service salt-master start
    service salt-minion start
    service salt-api start
    salt '*' test.ping
    useradd test
    echo test:molten | chpasswd
  SHELL
end
