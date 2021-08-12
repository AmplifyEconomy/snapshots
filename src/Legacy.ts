import { LEGACY_TRANSACTIONS, OUTPUT_TRANSACTIONS, TransactionOrder } from './Config';
import { TransformFile } from './service/service.transform';

export async function Start() {
    console.log(`Parsing ${LEGACY_TRANSACTIONS} to ${OUTPUT_TRANSACTIONS}`.green.bold)
    await TransformFile(LEGACY_TRANSACTIONS, OUTPUT_TRANSACTIONS, TransactionOrder);
}

(async () => await Start())();
