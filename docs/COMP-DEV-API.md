# CompDev API

## Configure container

From the host VM, ssh into the container

```
ssh comp-dev-api
```

## Clone CompDev

```
cd ~
git clone git@github.com:zerodevgroup/comp-dev.git
```

## Generate api

```
cd ~/comp-dev
la build --project ./config/api/project.json
```

## Deploy api

```
cd ~/comp-dev
la deploy --project ./config/api/project.json
```

## Configure nginx

```
cd ~/comp-dev
la build --project ./config/api/nginx.json
```

## Restart nginx

```
systemctl restart nginx
```

## Test nginx config

```
curl -X POST -H 'accept: application/json' -H 'content-type: application/json' -d '{"limit":0}' http://localhost/list/users
```


## PM2 startup/save

```
pm2 startup
pm2 save
```
