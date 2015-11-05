/etc/apt/preferences.d/testing.prefs:
  file.managed:
    - contents: |
        Package: *
        Pin: release a=testing
        Pin-Priority: 750

net.ipv4.ip_forward:
  sysctl.present:
    - value: 1

base:
  pkgrepo.managed:
    - humanname: deb-testing
    - name: deb http://httpredir.debian.org/debian testing main
    - file: /etc/apt/sources.list.d/deb-testing.list

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
