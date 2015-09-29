Vagrant.configure(2) do |config|
  config.vm.box = "debian/jessie64"
  config.vm.box_check_update = false
  config.vm.provider "virtualbox" do |vb|
   vb.memory = "1024"
  end

  config.vm.define "dev" do |hostconfig|
    hostconfig.vm.synced_folder "./dist", "/dist"
    hostconfig.vm.network "private_network", ip: "192.168.42.42"
    hostconfig.vm.provision "shell", path: "dev/bootstrap-dev.sh"
  end

  config.vm.define "demo" do |hostconfig|
    hostconfig.vm.network "private_network", ip: "192.168.42.43"
    hostconfig.vm.provision "shell", path: "demo/bootstrap-demo.sh"
  end
end
