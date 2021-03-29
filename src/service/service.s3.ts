import ProgressBar from 'progress';
import { createReadStream } from 'fs';
import { S3, Endpoint } from 'aws-sdk';
import { KEY, SECRET, ENDPOINT, NAME } from '../Config';

export const endpoint = new Endpoint(ENDPOINT);

export const s3 = new S3({
    endpoint,
    accessKeyId: KEY,
    secretAccessKey: SECRET,
});

export async function UploadStream(input: string, output: string) {
    const stream = createReadStream(input);
    
    const params = {
        Bucket: NAME,
        Key: output,
        Body: stream,
    };

    const writeStream = s3.upload(params);

    let bar;
    
    writeStream.on(`httpUploadProgress`, progress => {
        if (!bar && progress.total) {
            bar = new ProgressBar(
                ':current/:total uploaded [:bar] :percent :etas',
                {
                    complete: '|',
                    incomplete: ' ',
                    total: progress.total,
                },
            );
        }

        bar.tick(progress.loaded - bar.curr);
    });

    await writeStream.promise();
}