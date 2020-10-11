# comp-dev

## Capture TIMESTAMP
```
export TIMESTAMP=`timestamp.sh`
```

## Import to Mongo (cold-might)
```
cd ~/cold-might/tools
./drop-database.sh compdev
./import.sh ~/wip/output-$TIMESTAMP
```
