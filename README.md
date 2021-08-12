# Arweave Gateway Snapshots

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build Status](https://travis-ci.org/AmplifyEconomy/snapshots.svg?branch=master)](https://travis-ci.org/AmplifyEconomy/snapshots)
[![codecov](https://codecov.io/gh/AmplifyEconomy/snapshots/branch/master/graph/badge.svg)](https://codecov.io/gh/AmplifyEconomy/snapshots)

A way to parse snapshots and archive snapshots for Arweave and upload them to the Akash Network.

## Configuration

Update the configuration file with the appropriate urls.

```config
LEGACY_TRANSACTIONS=/arweave/legacy/transaction.csv
OUTPUT_TRANSACTIONS=/arweave/parsed

LEGACY_TAGS=/arweave/legacy/tags.csv
OUTPUT_TAGS=/arweave/parsed

SQL_PATH=/arweave/snapshot

ARCHIVE_PATH=
ARCHIVE_URL=

KEY=
SECRET=
ENDPOINT=
NAME=

INDICES=["App-Name", "app", "domain", "namespace"]
```

Copy the config file to `.env`.

```bash
cp .env.default .env
```

## Development

### `yarn dev:build`

Compiles the typescript to `dist`.

### `yarn dev:legacy`

Runs the legacy parsing script.

### `yarn dev:tags`

Runs the legacy tags parsing script.

### `yarn dev:sql`

Generates SQL statements

### `yarn dev:upload`

Runs the upload scripts.