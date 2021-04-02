import { statSync, createReadStream, createWriteStream } from 'fs';
import ProgressBar from 'progress';
import progress from 'progress-stream';
import { parse } from 'fast-csv';
import { TagOrder } from '../Order';

export async function TransformTags(input: string, output_folder: string) {
    let index = 0;
    let chunkSize = 5000000;
    let count = 0;

    let writer = createWriteStream(`${output_folder}/tags.chunk${index}.csv`, { flags: 'w' });
    writer.write(TagOrder.join(`|`) + `\n`);

    const size = statSync(input).size;

    const bar = new ProgressBar(
        ':current/:total processed [:bar] :percent :etas',
        {
            complete: '|',
            incomplete: '~',
            total: size,
        },
    );

    const reader = createReadStream(input, { flags: 'r', encoding: 'utf8' })
        .pipe(progress({ length: size, time: 1000 }))
        .on('progress', progress => {
            bar.tick(progress.delta);
        })
        .pipe(parse({ headers: true, delimiter: '|', escape: '\\' }))
        .on('data', row => {
            count++;

            if (count >= chunkSize) {
                count = 0;
                index++;
                writer = createWriteStream(`${output_folder}/tags.chunk${index}.csv`, { flags: 'w' });
                writer.write(TagOrder.join(`|`) + `\n`);
            }

            let line = [];
            let write = true;

            for (let i = 0; i < TagOrder.length; i++) {
                const key = TagOrder[i];

                if (key === `tx_id` && row[key].length >= 64) {
                    write = false;
                }

                if (!row[key] || row[key].length >= 2048) {
                    write = false;
                }

                if (!row[key].match(/[a-zA-Z0-9!@#\$%\^\&*\ )\(+=._-]+$/g)) {
                    write = false;
                }

                line.push(`"${row[key].replace(/"/g, '').replace(/\n/g, '')}"`);
            }

            if (write) {
                writer.write(line.join(`|`) + `\n`);
            }
        })
        .on('error', error => {
            console.error(error);
        })
        .on('end', () => {
            writer.end();
            console.log(`Finished writing tags from ${input} to ${output_folder}`.green.bold);
            process.exit();
        });
}