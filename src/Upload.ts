import { ARCHIVE_PATH, ARCHIVE_URL } from './Config';
import { UploadStream } from './service/service.s3';

export async function Upload() {
    console.log(`Uploading ${ARCHIVE_PATH} to ${ARCHIVE_URL}`.green.bold);
    await UploadStream(ARCHIVE_PATH, ARCHIVE_URL);
    console.log(`Completed`.green.bold);
}

(async () => await Upload())();