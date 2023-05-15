ARG FROSTFS_HUB_IMAGE=truecloudlab/frostfs
ARG NEOGO_HUB_IMAGE=nspccdev/neo-go

ARG FROSTFS_CORE_TAG=0beb7ccf
ARG FROSTFS_GATES_TAG=0.27.0-rc.2
ARG NEOGO_TAG=0.101.1

FROM ${NEOGO_HUB_IMAGE}:${NEOGO_TAG} as neo-go
FROM ${FROSTFS_HUB_IMAGE}-adm:${FROSTFS_CORE_TAG} as frostfs-adm
FROM ${FROSTFS_HUB_IMAGE}-cli:${FROSTFS_CORE_TAG} as frostfs-cli
FROM ${FROSTFS_HUB_IMAGE}-ir:${FROSTFS_CORE_TAG} as frostfs-ir
FROM ${FROSTFS_HUB_IMAGE}-storage:${FROSTFS_CORE_TAG} as frostfs-storage
FROM ${FROSTFS_HUB_IMAGE}-s3-gw:${FROSTFS_GATES_TAG} as frostfs-s3-gw
FROM ${FROSTFS_HUB_IMAGE}-http-gw:${FROSTFS_GATES_TAG} as frostfs-http-gw

# Executable image
FROM alpine AS frostfs-aio
RUN apk add --no-cache \
  bash \
  ca-certificates \
  jq \
  expect \
  iputils \
  curl

WORKDIR /

COPY --from=neo-go /usr/bin/privnet-entrypoint.sh /usr/bin/privnet-entrypoint.sh
COPY --from=neo-go /etc/ssl/certs /etc/ssl/certs
COPY --from=neo-go /usr/bin/neo-go /usr/bin/neo-go
COPY --from=frostfs-adm /bin/frostfs-adm /usr/bin/frostfs-adm
COPY --from=frostfs-cli /bin/frostfs-cli /usr/bin/frostfs-cli
COPY --from=frostfs-ir /bin/frostfs-ir /usr/bin/frostfs-ir
COPY --from=frostfs-storage /bin/frostfs-node /usr/bin/frostfs-node
COPY --from=frostfs-s3-gw /bin/frostfs-s3-gw /usr/bin/frostfs-s3-gw
COPY --from=frostfs-s3-gw /bin/frostfs-s3-authmate /usr/bin/frostfs-s3-authmate
COPY --from=frostfs-http-gw /bin/frostfs-http-gw /usr/bin/frostfs-http-gw

COPY ./adm/frostfs-adm.yml /config/frostfs-adm.yml
COPY ./ir/cli-cfg.yaml /config/cli-cfg-ir.yaml
COPY ./ir/config.yaml /config/config-ir.yaml
COPY ./morph/protocol.privnet.yml /config/protocol.privnet.yml
COPY ./morph/node-wallet.json /config/alphabet/az.json
COPY ./morph/node-wallet.json /config/node-wallet.json
COPY ./morph/node-config.yaml /config/node-config.yaml
COPY ./http-gw/http-gw-config.yaml /config/http-gw-config.yaml
COPY ./http-gw/http-gw-wallet.json /config/http-gw-wallet.json
COPY ./s3-gw/rules.json /config/bearer-rules.json
COPY ./s3-gw/s3-gw-config.yaml /config/s3-gw-config.yaml
COPY ./s3-gw/s3-gw-wallet.json /config/s3-gw-wallet.json
COPY ./s3-gw/user-wallet.json /config/user-wallet.json
COPY ./sn/cli-cfg.yaml /config/cli-cfg-sn.yaml
COPY ./sn/wallet.json /config/wallet-sn.json
COPY ./sn/config.yaml /config/config-sn.yaml
COPY ./vendor/locode_db /config/locode.db
COPY ./vendor/contracts/ /config/contracts

COPY ./bin/ /config/bin

ENV AUTHMATE_WALLET_PASSPHRASE=""

ENTRYPOINT ["/config/bin/init-aio.sh"]
