#!/usr/bin/env sh

_log() {
  echo 
  echo "[logger] ==> $1"
  echo 
}

gcls() {
  git reset --h
  git clean -df 
}

_branch='develop'
_mode='test'

[ "$1" = "prod" ] && {
  _branch='master'
  _mode='prod'
}

[ "$1" = "release" ] && {
  _branch='release'
  _mode='prod'
}


_log "branch-> $_branch mode-> $_mode"

_log "cd release"
cd ../mobile3-release

_log "gcls"
gcls

_log "gco"
git checkout $_branch || git checkout -b $_branch origin/$_branch || (git checkout -b $_branch && git branch --set-upstream-to=origin/$_branch $_branch)

_log "gcls"
gcls

_log "gl"
git pull

_log "rm"
rm -rf static

_log "cd mobile3"
cd - 

_log "build.."
vue-cli-service build --mode $_mode 
_log "cd release"
cd ../mobile3-release 
_log "publish..."
npm run publish
_log "over"
cd -