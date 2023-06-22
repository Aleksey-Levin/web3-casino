#!/usr/bin/make -f

include .env
include help.mk

# Common variables
REPO=$(notdir $(shell pwd))
VERSION ?= "$(shell git describe --tags --match "v*" 2>/dev/null || git rev-parse --short HEAD | sed 's/^v//')"

# Variables for docker
NEOGO_HUB_IMAGE ?= "nspccdev/neo-go"
NEOGO_HUB_TAG ?= "0.101.1"
FROSTFS_HUB_IMAGE ?= "truecloudlab/frostfs"
FROSTFS_CORE_TAG ?= "0beb7ccf"
FROSTFS_GATES_TAG ?= "0.27.0-rc.2"
AIO_IMAGE ?= "truecloudlab/frostfs-aio"

# Variables for compose
COMPOSE_CMD_UP ?= docker-compose up -d
COMPOSE_CMD_DOWN ?= docker-compose down

COMPOSE_V2 = "$(shell docker compose version --short | grep -q '^2' && echo true)"
ifeq ($(COMPOSE_V2), "true")
	COMPOSE_CMD_UP = docker compose up -d --wait
	COMPOSE_CMD_DOWN = docker compose down
endif

# Variables for S3
S3_BEARER_RULES ?= "/config/bearer-rules.json"
S3_GATE_PUBLIC_KEY ?= "0312fe65b101565de74eedf477afb43417ff5f795732506cfddc8e044c5a030d76"

# Build aio Docker image
image-aio:
	@echo "⇒ Build aio docker image "
	@docker build \
		--rm \
		--build-arg FROSTFS_HUB_IMAGE=$(FROSTFS_HUB_IMAGE) \
		--build-arg FROSTFS_CORE_TAG=$(FROSTFS_CORE_TAG) \
		--build-arg FROSTFS_GATES_TAG=$(FROSTFS_GATES_TAG) \
		--build-arg NEOGO_HUB_IMAGE=$(NEOGO_HUB_IMAGE) \
		--build-arg NEOGO_TAG=$(NEOGO_HUB_TAG) \
		-f Dockerfile \
		-t $(AIO_IMAGE):$(AIO_VERSION) .

# Start AIO
up:
	@$(COMPOSE_CMD_UP)

# Stop AIO
down:
	@$(COMPOSE_CMD_DOWN)

# Clean up
clean:
	@$(COMPOSE_CMD_DOWN) --volumes

# Generate S3 credentials
s3cred:
	@docker exec aio /usr/bin/frostfs-s3-authmate issue-secret \
		--wallet /config/user-wallet.json \
		--peer localhost:8080 \
		--gate-public-key $(S3_GATE_PUBLIC_KEY) \
		--container-placement-policy "REP 1" \
		--bearer-rules $(S3_BEARER_RULES) 
                
# Tick new epoch in side chain
tick.epoch:
	@docker exec aio /usr/bin/frostfs-adm --config /config/frostfs-adm.yml morph force-new-epoch

# Show current version
version:
	@echo $(VERSION)
	@echo "frostfs-node: $(AIO_VERSION)"
	@echo "neo-go: $(NEOGO_VERSION)"
