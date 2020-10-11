# comp-dev

## Capture TIMESTAMP
```
export TIMESTAMP=`timestamp.sh`
```

## Import to Mongo (comp-dev)
```
cd ~/comp-dev/tools
./drop-database.sh compdev
./import.sh ~/wip/output-$TIMESTAMP
```
