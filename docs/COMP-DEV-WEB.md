# CompDev WEB

## Configure container

From the host VM, ssh into the container

```
ssh comp-dev-web
```

### Clone CompDev

```
cd ~
git clone git@github.com:vortex7/comp-dev.git
```

### Generate code

```
cd ~/comp-dev
la build --project ./config/web/project-trustmine.json
```

## Deploy app

```
cd ~/comp-dev
la deploy --project ./config/web/project-trustmine.json
```

## Configure nginx

```
cd ~/comp-dev
la build --project ./config/web/nginx.json
```

## PM2 startup/save

```
pm2 startup
pm2 save
```
