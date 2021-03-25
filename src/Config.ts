import { config } from 'dotenv';

config();

export const LEGACY_BLOCKS_URL = process.env.LEGACY_BLOCKS_URL;
export const LEGACY_TRANSACTIONS_URL = process.env.LEGACY_TRANSACTIONS_URL;
export const LEGACY_TAGS_URL = process.env.LEGACY_TAGS_URL;

export const LTS_BLOCKS_URL = process.env.LTS_BLOCKS_URL;
export const LTS_TRANSACTIONS_URL = process.env.LTS_TRANSACTIONS_URL;
export const LTS_TAGS_URL = process.env.LTS_TAGS_URL;

export const OUTPUT_FOLDER = process.env.OUTPUT_FOLDER;
export const OUTPUT_URL = process.env.OUTPUT_URL;

export const KEY = process.env.KEY;
export const SECRET = process.env.SECRET;
export const ENDPOINT = process.env.ENDPOINT;
export const NAME = process.env.NAME;