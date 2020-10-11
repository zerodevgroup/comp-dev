# CompDev Cloud Setup

## Install Ubuntu 20.04 on a Digital Ocean Droplet

  - CPU & Memory
    - Processors: 4
    - Memory: 8GB
  - Hard Disk
    - Size: 160GB


## Copy ssh keys

```
scp ~/.ssh/id_rsa* milspec.io:/root/.ssh
```

## ssh into the cloud box

```
ssh milspec.io
```

## Clone lock-alpha

```
set -o vi
export EDITOR=vi
export VISUAL=vi
apt update
apt upgrade --yes
cd ~
git clone git@github.com:vortex7/lock-alpha.git
```

## Install Node JS

```
cd ~/lock-alpha/tools
./node-js-install.sh
```

## Debian Setup

```
cd ~/lock-alpha
./lock-alpha.sh environment --debian-setup
```

## Reboot 

```
reboot
```

## Initiallize LXD

```
lxd init
```

ALL answer values = default, suggested container size 100GB or 70% of your VM hard disk size

- Would you like to use LXD clustering? (yes/no) [default=no]:
- Do you want to configure a new storage pool? (yes/no) [default=yes]:
- Name of the new storage pool [default=default]:
- Name of the storage backend to use (btrfs, ceph, dir, lvm, zfs) [default=zfs]: 
- Create a new ZFS pool? (yes/no) [default=yes]:
- Would you like to use an existing block device? (yes/no) [default=no]:
- Size in GB of the new loop device (1GB minimum) [default=15GB]: 100GB
- Would you like to connect to a MAAS server? (yes/no) [default=no]:
- Would you like to create a new local network bridge? (yes/no) [default=yes]:
- What should the new bridge be called? [default=lxdbr0]: 
- What IPv4 address should be used? (CIDR subnet notation, “auto” or “none”) [default=auto]: 
- What IPv6 address should be used? (CIDR subnet notation, “auto” or “none”) [default=auto]: 
- Would you like LXD to be available over the network? (yes/no) [default=no]:
- Would you like stale cached images to be updated automatically? (yes/no) [default=yes]: 
- Would you like a YAML "lxd init" preseed to be printed? (yes/no) [default=no]: 

## Create lock-alpha-os

lock-alpha-os: A base operating system for containers

```
la os
```

## Create containers

From the host VM:

```
la container --operation create --container-name comp-dev-api
la container --operation create --container-name comp-dev-web
```

## Configure Certbot

```
snap install --classic certbot
certbot certonly --nginx
```

## Configure renewal json file
```
vi ~/.certbot-renew.json
```

```
{
  "renewalDate": "12/19/2019",
  "domain": "milspec.io"
}
```

## Configure crontab for certbot rewnewal
```
mkdir ~/logs
crontab -e
```

```
0 0 * * * /root/lock-alpha/tools/certbot-renew.sh 2>&1 > /root/logs/certbot-renew.log
5 0 * * * /root/comp-dev/tools/db-backup.sh 2>&1 > /root/logs/db-backup.log
10 0 * * * /root/lock-alpha/lock-alpha.sh container --operation restart --container-name comp-dev-api
0 2 * * * /root/lock-alpha/lock-alpha.sh os
```

## Clone comp-dev

```
cd ~
git clone git@github.com:zerodevgroup/comp-dev.git
```

## Add containers to /etc/hosts on VM

```
cd ~/comp-dev
la build --project ./config/machines/cloud/hosts.json
```

## Configure nginx

From the Host VM

```
la build --project ./config/machines/cloud/nginx-trustmine.json
```
