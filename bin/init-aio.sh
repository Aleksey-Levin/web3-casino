#!/bin/bash

stage() {
  echo "================================================================================"
  echo "$@"
  echo "================================================================================"
}

die() {
  echo "$@" 1>&2
  exit 1
}

runBlockchain() {
  stage "Starting the blockchain"

  /usr/bin/neo-go node --config-path /config --privnet &

  while [[ "$(curl -s -o /dev/null -w %{http_code} localhost:30333)" != "422" ]];
  do
    sleep 2;
  done
}

configure() {
  stage "Configuring the blockchain"

  /usr/bin/frostfs-adm morph init --config /config/frostfs-adm.yml --contracts /config/contracts || die "Failed to initialize Alphabet wallets"

  /usr/bin/frostfs-adm morph refill-gas --config /config/frostfs-adm.yml --storage-wallet /config/wallet-sn.json --gas 10.0 || die "Failed to transfer GAS to alphabet wallets"
}

runServices() {
  stage "Running services"

  /usr/bin/frostfs-ir --config /config/config-ir.yaml &

  while [[ -z "$(/usr/bin/frostfs-cli control healthcheck --ir --endpoint localhost:16512 -c /config/cli-cfg-ir.yaml | grep 'Health status: READY')" ]];
  do
    sleep 2;
  done

  set -m
  /usr/bin/frostfs-node --config /config/config-sn.yaml &

  while [[ -z "$(/usr/bin/frostfs-cli control healthcheck --endpoint localhost:16513 -c /config/cli-cfg-sn.yaml | grep 'Health status: READY')" ]];
  do
    sleep 2
  done

  while [[ -z "$(/usr/bin/frostfs-cli control healthcheck --endpoint localhost:16513 -c /config/cli-cfg-sn.yaml | grep 'Network status: ONLINE')" ]];
  do
    /usr/bin/frostfs-adm morph force-new-epoch --config /config/frostfs-adm.yml || die "Failed to update epoch"
    sleep 2
  done

  /usr/bin/frostfs-s3-gw --config /config/s3-gw-config.yaml &
  /usr/bin/frostfs-http-gw --config /config/http-gw-config.yaml &
}


if [ ! -e "/data/chain/morph.bolt" ];
then
  runBlockchain
  configure
else
  runBlockchain
fi
runServices
stage "aio container started"
fg
