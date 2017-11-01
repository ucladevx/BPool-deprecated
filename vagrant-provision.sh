#! /bin/bash

echo "Running provision script..."

# DO NOT update grub. this is unnecessary and causes the provision to hang
sudo apt-mark hold grub-pc

# update and upgrade VM packages
sudo apt-get update
sudo apt-get -y upgrade

# install dev tools
sudo apt-get -y install vim gcc g++ gdb build-essential git curl sqlite3 jq ngrep \
                libyaml-dev python-software-properties python python-dev python-pip python-yaml
sudo pip install --upgrade pip
sudo pip install --upgrade virtualenv

# install docker requirements
sudo apt-get -y install linux-image-extra-$(uname -r) linux-image-extra-virtual
sudo apt-get -y install apt-transport-https ca-certificates software-properties-common

# add docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /tmp/docker.gpg
sudo apt-key add /tmp/docker.gpg

# add docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update

# install docker
sudo apt-get -y install docker-ce

# start docker on boot
sudo systemctl enable docker

# install docker-compose for complex docker setups
sudo bash -c 'curl -fsSL https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose'
sudo chmod +x /usr/local/bin/docker-compose

# add 'dc' shortcut for 'docker-compose'

# cleanup and size reduction
sudo apt-get -y purge installation-report landscape-common wireless-tools wpasupplicant ubuntu-serverguide
sudo apt-get -y purge python-dbus libnl1 python-smartpm python-twisted-core libiw30
sudo apt-get -y purge python-twisted-bin libdbus-glib-1-2 python-pexpect python-pycurl python-serial python-gobject python-pam python-openssl libffi5
sudo apt-get -y purge linux-image-3.0.0-12-generic-pae
sudo apt-get -y purge libx11-data xauth libxmuu1 libxcb1 libx11-6 libxext6
sudo apt-get -y purge ppp pppconfig pppoeconf popularity-contest

sudo dpkg --list | awk '{ print $2 }' | grep linux-headers | xargs sudo apt-get -y purge
sudo dpkg --list | awk '{ print $2 }' | grep 'linux-image-3.*-generic' | grep -v `uname -r` | xargs sudo apt-get -y purge
sudo dpkg --list | awk '{ print $2 }' | grep linux-source | xargs sudo apt-get -y purge
sudo dpkg --list | awk '{ print $2 }' | grep -- '-dev$' | xargs sudo apt-get -y purge

sudo apt-get -y clean
sudo apt-get -y autoremove
sudo apt-get -y purge

rm -rf VBoxGuestAdditions_*.iso VBoxGuestAdditions_*.iso.?
rm -f /tmp/chef*deb

# zero out swap space
swappart=$(cat /proc/swaps | grep -v Filename | tail -n1 | awk -F ' ' '{print $1}')
if [ "$swappart" != "" ]; then
    sudo swapoff $swappart
    sudo dd if=/dev/zero of=$swappart
    sudo mkswap $swappart
    sudo swapon $swappart
fi

sync
echo "Setup complete!"