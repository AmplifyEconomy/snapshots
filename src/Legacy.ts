import { LEGACY_BLOCKS_URL, LEGACY_TRANSACTIONS_URL, LEGACY_TAGS_URL, OUTPUT_FOLDER } from './Config';
import { TransformFile } from './service/service.transform';

export async function Start() {
    await TransformFile(LEGACY_BLOCKS_URL, `${OUTPUT_FOLDER}/blocks.csv`, []);
    await TransformFile(LEGACY_TRANSACTIONS_URL, `${OUTPUT_FOLDER}/transactions.csv`, []);
    await TransformFile(LEGACY_TAGS_URL, `${OUTPUT_FOLDER}/tags.csv`, []);
}

(async () => await Start())();
