import 'colors';
import { config } from 'dotenv';

config();

export const LEGACY_TRANSACTIONS = process.env.LEGACY_TRANSACTIONS;
export const OUTPUT_TRANSACTIONS = process.env.OUTPUT_TRANSACTIONS;

export const LEGACY_TAGS = process.env.LEGACY_TAGS;
export const OUTPUT_TAGS = process.env.OUTPUT_TAGS;

export const SQL_PATH = process.env.SQL_PATH;

export const ARCHIVE_PATH = process.env.ARCHIVE_PATH;
export const ARCHIVE_URL = process.env.ARCHIVE_URL;

export const KEY = process.env.KEY;
export const SECRET = process.env.SECRET;
export const ENDPOINT = process.env.ENDPOINT;
export const NAME = process.env.NAME;

export const INDICES = JSON.parse(process.env.INDICES || '[]') as Array<string>;

export const BlockOrder = ["id", "previous_block", "mined_at", "height", "txs", "extended"];
export const TransactionOrder = ["format", "id", "signature", "owner", "owner_address", "target", "reward", "last_tx", "height", "tags", "quantity", "content_type", "data_size", "data_root"];
export const TagOrder = ["tx_id", "index", "name", "value"];