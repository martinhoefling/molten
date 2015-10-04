libvirt-bin:
  pkg.installed

libvirtd:
  service.running:
    - watch:
      - file: /etc/libvirt/qemu/networks/autostart/default.xml

/etc/libvirt/qemu/networks/autostart/default.xml:
  file.symlink:
    - target: /etc/libvirt/qemu/networks/default.xml

lxc:
  pkg.installed:
    - require:
      - pkg: libvirt-bin


# required for creating ubuntu instances
ubuntu-archive-keyring:
  pkg.installed
