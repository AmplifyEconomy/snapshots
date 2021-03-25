# Gateway Snapshots

A way to parse snapshots and archive snapshots with AWS SDK compatible drivers.

## Configuration

Update the configuration file with the appropriate urls.

```config
LEGACY_BLOCKS_URL=https://aws.amazon.com
LEGACY_TRANSACTIONS_URL=https://aws.amazon.com
LEGACY_TAGS_URL=https://aws.amazon.com

LTS_BLOCKS_URL=https://aws.amazon.com
LTS_TRANSACTIONS_URL=https://aws.amazon.com
LTS_TAGS_URL=https://aws.amazon.com

OUTPUT_FOLDER=/arweave/parsed
OUTPUT_URL=https://aws.amazon.com

KEY=...
SECRET=...
ENDPOINT=...
NAME=...
```

Copy the config file to `.env`.

```bash
cp .env.default .env
```

## Development

### `yarn dev:build`

Builds the Typescript.

### `yarn dev:legacy`

Runs the legacy parsing script.

### `yarn dev:upload`

Runs the upload scripts.