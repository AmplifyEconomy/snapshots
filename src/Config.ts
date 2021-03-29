import 'colors';
import { config } from 'dotenv';

config();

export const LEGACY_BLOCKS_URL = process.env.LEGACY_BLOCKS_URL;
export const LEGACY_TRANSACTIONS_URL = process.env.LEGACY_TRANSACTIONS_URL;
export const LEGACY_TAGS_URL = process.env.LEGACY_TAGS_URL;

export const LTS_BLOCKS_URL = process.env.LTS_BLOCKS_URL;
export const LTS_TRANSACTIONS_URL = process.env.LTS_TRANSACTIONS_URL;
export const LTS_TAGS_URL = process.env.LTS_TAGS_URL;

export const LEGACY_TRANSACTIONS = process.env.LEGACY_TRANSACTIONS;
export const OUTPUT_TRANSACTIONS = process.env.OUTPUT_TRANSACTIONS;

export const ARCHIVE_PATH = process.env.ARCHIVE_PATH;
export const ARCHIVE_URL = process.env.ARCHIVE_URL;

export const KEY = process.env.KEY;
export const SECRET = process.env.SECRET;
export const ENDPOINT = process.env.ENDPOINT;
export const NAME = process.env.NAME;

export const INDICES = JSON.parse(process.env.INDICES || '[]') as Array<string>;