# CompDev Local VM Setup

## Lock Alpha
[Lock Alpha Setup](https://github.com/vortex7/lock-alpha/blob/master/ENVIRONMENT-SETUP.md)

## Create containers

From the host VM:

```
la container --operation create --container-name comp-dev-api
la container --operation create --container-name comp-dev-web
```

## Clone comp-dev

```
git clone git@github.com:vortex7/comp-dev.git
```

## Add containers to /etc/hosts on VM

```
cd ~/comp-dev
la build --project ./config/machines/local/hosts.json
```

## Configure VM nginx

From the host VM

```
la build --project ./config/machines/local/nginx.json
```

### Install mongo shell client

```
la environment --mongo-shell-install
```
