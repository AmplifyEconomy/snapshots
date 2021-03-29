# Gateway Snapshots

A way to parse snapshots and archive snapshots with AWS SDK compatible drivers. This tool will eventually migrate to archiving snapshots to Arweave in the future.

## Configuration

Update the configuration file with the appropriate urls.

```config
LEGACY_BLOCKS_URL=
LEGACY_TRANSACTIONS_URL=
LEGACY_TAGS_URL=

LTS_BLOCKS_URL=
LTS_TRANSACTIONS_URL=
LTS_TAGS_URL=

LEGACY_TRANSACTIONS=/arweave/legacy/transaction.csv
OUTPUT_TRANSACTIONS=/arweave/parsed/transaction.csv

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

### `yarn dev:upload`

Runs the upload scripts.