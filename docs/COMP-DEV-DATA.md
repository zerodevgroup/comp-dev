# CompDev DATA

## Import data

Warning : this removes ALL existing data!

Note: All commands are executed from the comp-dev-api container

### Copy files from backup

```
export BACKUP_DATE="2019_12_30"
mkdir -p /var/backups/comp-dev
cd /var/backups/comp-dev
scp data.zerodevgroup.com:/var/backups/comp-dev/data-backup-$BACKUP_DATE.zip .
unzip data-backup-$BACKUP_DATE.zip
```

### Transform data
```
cd ~/comp-dev/tools/
./transform-all.sh $BACKUP_DATE
```

### Import data

Warning : this removes ALL existing data!

```
cd ~/comp-dev/tools/
./import.sh $BACKUP_DATE $TOKEN
```

### Index data
```
cd ~/comp-dev/tools/
./create-index-all.sh
```
