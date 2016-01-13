Vagrant.configure(2) do |config|
  config.vm.box = "debian/jessie64"
  config.vm.box_check_update = false
  config.vm.provider "virtualbox" do |vb|
   vb.memory = "1024"
  end

  config.vm.define "dev" do |hostconfig|
    hostconfig.vm.synced_folder "./dist", "/molten"
    hostconfig.vm.network "private_network", ip: "192.168.42.42"
    hostconfig.vm.provision "shell", inline: <<-SHELL
        set -ux
        /vagrant/vagrant/bootstrap-dev.sh
        ln -s /molten /opt/molten
        salt-call state.sls molten.api-configuration
        salt-call state.sls molten.api-packages
        systemctl restart salt-master
        echo "You can now connect to http://192.168.42.42:8000/molten/ as user test / molten"
        SHELL
  end

  config.vm.define "demo" do |hostconfig|
    hostconfig.vm.network "private_network", ip: "192.168.42.43"
    hostconfig.vm.provision "shell", inline: <<-SHELL
        set -ux
        /vagrant/vagrant/bootstrap-dev.sh
        salt-call state.sls molten.full
        systemctl restart salt-master
        echo "You can now connect to http://192.168.42.43:8000/molten/ as user test / molten"
        SHELL
  end

  config.vm.define "dev-cloud" do |hostconfig|
    hostconfig.vm.synced_folder "./dist", "/molten"
    hostconfig.vm.network "private_network", ip: "192.168.42.44"
    hostconfig.vm.provision "shell", inline: <<-SHELL
        set -ux
        /vagrant/vagrant/bootstrap-dev.sh
        ln -s /molten /opt/molten
        salt-call state.sls molten.api-configuration
        salt-call state.sls molten.api-packages
        apt-get install -y salt-cloud
        salt-call state.sls lxc
        systemctl restart salt-master
        echo "You can now connect to http://192.168.42.44:8000/molten/ as user test / molten"
        SHELL
  end
end
