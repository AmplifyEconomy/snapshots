import { TRANSACTIONS, OUTPUT_TRANSACTIONS, TransactionOrder } from './Config';
import { TransformFile } from './service/service.transform';

export async function Start() {
    console.log(`Parsing ${TRANSACTIONS} to ${OUTPUT_TRANSACTIONS}`.green.bold);
    await TransformFile(TRANSACTIONS, OUTPUT_TRANSACTIONS, TransactionOrder);
}

(async () => await Start())();
