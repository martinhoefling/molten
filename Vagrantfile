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
        set -ux  end
        /vagrant/vagrant/bootstrap-dev.sh
va
        SHELL
  end

  config.vm.define "demo" do |hostconfig|
    hostconfig.vm.network "private_network", ip: "192.168.42.43"
    hostconfig.vm.provision "shell", inline: <<-SHELL
        set -ux
        cd /
        curl -s -L https://github.com/martinhoefling/molten/releases/download/v0.1.0/molten-0.1.0.tar.gz | tar -xz
        mv molten-* molten
        /vagrant/vagrant/bootstrap-dev.sh
        echo "You can now connect to http://192.168.42.43:8000/molten/ as user test / molten"
        SHELL
  end

  config.vm.define "dev-cloud" do |hostconfig|
    hostconfig.vm.synced_folder "./dist", "/molten"
    hostconfig.vm.network "private_network", ip: "192.168.42.44"
    hostconfig.vm.provision "shell", inline: <<-SHELL
        set -ux
        /vagrant/vagrant/bootstrap-dev.sh
        apt-get install -y salt-cloud
        salt-call state.sls lxc
        echo "You can now connect to http://192.168.42.44:8000/molten/ as user test / molten"
        SHELL
  end
end
