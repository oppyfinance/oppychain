PACKAGES=$(shell go list ./... | grep -v '/oppychaind')
COVERAGE="coverage.out"

#VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
VERSION := $(shell echo $(shell git describe --tags --first-parent) | sed 's/^v//')
COMMIT := $(shell git log -1 --format='%H')

ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=oppyChain \
	-X github.com/cosmos/cosmos-sdk/version.ServerName=oppyChaind \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT)

BUILD_FLAGS := -ldflags '$(ldflags)'


protoVer=v0.8
protoImageName=oppy/oppy-proto-gen:$(protoVer)
containerProtoGen=cosmos-sdk-proto-gen-$(protoVer)
containerProtoFmt=cosmos-sdk-proto-fmt-$(protoVer)


all: build

install: go.sum
	@echo "--> Installing oppychaind(version $(VERSION))"
	go build -mod=readonly $(BUILD_FLAGS) ./cmd/oppyChaind


proto-gen:
	@echo "Generating Protobuf files"
	@if docker ps -a --format '{{.Names}}' | grep -Eq "^${containerProtoGen}$$"; then docker start -a $(containerProtoGen); else docker run --name $(containerProtoGen) -v $(CURDIR):/workspace --workdir /workspace $(protoImageName) \
		sh ./scripts/protocgen.sh; fi


proto-image-build:
	@DOCKER_BUILDKIT=1 docker build -t $(protoImageName) -f ./proto/Dockerfile ./proto

build: go.sum
	@echo "--> build oppyChaind"
	@go build -mod=readonly $(BUILD_FLAGS) ./cmd/oppyChaind

go.sum: go.mod
	@echo "--> Ensure dependencies have not been modified"
	GO111MODULE=on go mod verify

test:
	@go test -v -mod=readonly $(PACKAGES) -coverprofile=$(COVERAGE) -covermode=atomic

format:
	@gofumpt -l -w .

lint:
	@echo "run go lint"
	@golangci-lint run --out-format=tab  -v --timeout 3600s -c ./.golangci.yml
