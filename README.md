# FrostFS All-in-One

Single node deployment helper provides instructions on how to deploy FrostFS
components in the on-premise setup on one physical or virtual server. There will
be just one instance of a service of each type, hence it is suitable for
development purposes only and not recommended for production use.


# Server requirements

- Docker with docker-compose
- `jq`
- `curl`


# Quick Start

Run container:

``` sh
$ git clone ssh://git@b.yadro.com:7999/obj/frostfs-aio.git /opt/frostfs
$ cd /opt/frostfs
$ make up
```

Initial start takes about 40 seconds. Its readiness is based on healthcheck done by `docker-compose`.

The container can be stopped when needed:

``` sh
$ make down
```

The stored data and the blockchain configuration remain until the container's volume is deleted.
So the next time we start the container with `make up` it will take about 10 seconds to initialize.

A storage node container uses persistent storage, so, if you've updated `aio` version
or just want to reset the `frostfs-aio`, it's recommended to clear its local volume
before starting the container:

``` sh
$ make clean
```

Also, you may have to make sure the storage node is in the network map.

``` sh
$ docker exec -ti aio frostfs-cli netmap snapshot -c /config/cli-cfg-sn.yaml --rpc-endpoint 127.0.0.1:8080
Epoch: 45
Node 1: 022bb4041c50d607ff871dec7e4cd7778388e0ea6849d84ccbd9aa8f32e16a8131 ONLINE /dns4/localhost/tcp/8080
    Continent: Europe
    Country: Germany
    CountryCode: DE
    Deployed: Private
    Location: Falkenstein
    Price: 10
    SubDiv: Sachsen
    SubDivCode: SN
    UN-LOCODE: DE FKS
```

If you don't see the output like this, you can wait for the new Epoch to come
(about 1 hour), or force the starting of new epoch.
If the commands fails, make sure you have jq installed.

``` sh
$ make tick.epoch
Updating FrostFS epoch to 2
752aa525dfb36b6447f45b41fd3906db9f6a9cdecd2cf36ce6816b1b6ef453192
```

Now everything is ready to serve your requests.


# Build images

Also, you can build the aio image itself:

``` sh
$ make image-aio
```


# Simple storage


## S3 interface

### Setup S3

As soon as the storage node is in the network map (see above) you can generate S3
credentials:

``` sh
$ make s3cred
{
  "access_key_id": "EXArWh8x1zeHG3851s1RtoCo7dowxF6rhLGA15nbMffT0AKRSjJ5fmcqf3Ht2VCAkfmPQUVARghRB77xHCA1BoN2p",
  "secret_access_key": "d70c1dba83f0f90bb231f06f1ce0e0dfbcfb122f4b4345a3c18d3869c359b79f",
  "owner_private_key": "140947599afd9ca89af4b358c3176eb046e554d942a0dc99a8e06f3e43c8f4ad",
  "wallet_public_key": "0324e76288fcb900100d01802a14ef977cca45ad073561230446df14b344c858b6",
  "container_id": "EXArWh8x1zeHG3851s1RtoCo7dowxF6rhLGA15nbMffT"
}                   
```

Now let's configure an S3 client (AWS CLI will be used as example):

``` sh
$ aws configure
AWS Access Key ID []: EXArWh8x1zeHG3851s1RtoCo7dowxF6rhLGA15nbMffT0AKRSjJ5fmcqf3Ht2VCAkfmPQUVARghRB77xHCA1BoN2p
AWS Secret Access Key []: d70c1dba83f0f90bb231f06f1ce0e0dfbcfb122f4b4345a3c18d3869c359b79f
Default region name []: us-east-1
Default output format []: json
```

### Create a container

``` sh
$ aws s3api --endpoint http://localhost:8084 create-bucket --bucket koty --acl public-read-write
```

### Put an object

``` sh
$ aws s3api --endpoint http://localhost:8084 put-object --bucket koty --key kot --body cat.jpg
{                                                                                                                                                                                                                                                                               
    "ETag": "8677919550a90ff7106584285f25a70ac9e7aa38bdb4ed17d34bbfb366fd71b7"                                                                                                                                                                                                  
} 
```

### List objects

``` sh
$ aws s3api --endpoint http://localhost:8084 list-objects --bucket koty
{
    "Contents": [
        {
            "Key": "kot",
            "LastModified": "2023-02-17T15:01:52+00:00",
            "ETag": "8677919550a90ff7106584285f25a70ac9e7aa38bdb4ed17d34bbfb366fd71b7",
            "Size": 174512,
            "Owner": {
                "DisplayName": "NWeByJPgNC97F83hTUnSbnZSBKaFvk5HNw",
                "ID": "NWeByJPgNC97F83hTUnSbnZSBKaFvk5HNw"
            }
        }
    ]
}
```


## frostfs-cli interface

### Create container with frostfs-cli

``` sh
$ frostfs-cli -r localhost:8080 -w /config/user-wallet.json \
            --address NWeByJPgNC97F83hTUnSbnZSBKaFvk5HNw \
            container create \
            --policy "REP 1" --basic-acl public-read-write --await
container ID: GfWw35kHds7gKWmSvW7Zi4U39K7NMLK8EfXBQ5FPJA46
awaiting...
container has been persisted on sidechain
```

### Put an object with frostfs-cli

``` sh
$ frostfs-cli -r localhost:8080 -w /config/user-wallet.json \
            --address NWeByJPgNC97F83hTUnSbnZSBKaFvk5HNw \
            object put \
            --cid GfWw35kHds7gKWmSvW7Zi4U39K7NMLK8EfXBQ5FPJA46 \
            --file cat.jpg
[cat.jpg] Object successfully stored
  OID: HByVC9A34i22BnzW3n83z9vEMxuYZoC7nNu11ZvGeCTe
  CID: GfWw35kHds7gKWmSvW7Zi4U39K7NMLK8EfXBQ5FPJA46
```

### Get and object with frostfs-cli

``` sh
$ frostfs-cli -r localhost:8080 -w /config/user-wallet.json \
            --address NWeByJPgNC97F83hTUnSbnZSBKaFvk5HNw \
            object get \
            --cid GfWw35kHds7gKWmSvW7Zi4U39K7NMLK8EfXBQ5FPJA46 \
            --oid HByVC9A34i22BnzW3n83z9vEMxuYZoC7nNu11ZvGeCTe > new_cat.jpg
```
