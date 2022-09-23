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

all: build

install: go.sum
	@echo "--> Installing oppychaind(version $(VERSION))"
	go build -mod=readonly $(BUILD_FLAGS) ./cmd/oppyChaind

protoc:
	@echo "--->build the protoc"
	@starport generate proto-go

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
