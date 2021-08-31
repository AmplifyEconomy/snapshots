import { statSync, createReadStream, createWriteStream } from 'fs';
import ProgressBar from 'progress';
import progress from 'progress-stream';
import { parse } from 'fast-csv';
import { INDICES } from '../Config';
import { Tag, tagValue } from '../utility/utility.tag';

export async function TransformFile(input: string, output_folder: string, order: Array<string>) {
    let index = 0;
    let chunkSize = 250000;
    let count = 0;

    let writer = createWriteStream(`${output_folder}/transaction.chunk${index}.csv`, { flags: 'w' });
    writer.write(order.concat(INDICES).join(`|`) + `\n`);

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
                writer = createWriteStream(`${output_folder}/transaction.chunk${index}.csv`, { flags: 'w' });
                writer.write(order.concat(INDICES).join(`|`) + `\n`);
            }

            const tags = row.tags ? (JSON.parse(row.tags)) : [] as Array<Tag>;
            const coreValues: Array<string> = [];
            const indexValues: Array<string> = [];
            
            for (let i = 0; i < order.length; i++) {
                const key = order[i];
                if (row[key].indexOf(`<html>`) !== -1) {
                    coreValues.push(`""`);
                } else if (key === 'tags' && !row[key]) {
                    coreValues.push(`"[]"`);
                } else {
                    coreValues.push(`"${row[key].replace(/"/g, '\\"')}"`);
                }
            }

            for (let i = 0; i < INDICES.length; i++) {
                const index = INDICES[i];
                const value = tagValue(tags, index);

                if (value.length > 1 && value.length < 64) {
                    indexValues.push(`"${value}"`);
                } else {
                    indexValues.push(`""`);
                }                
            }

            const indexedLine = coreValues.join(`|`) + `|` + indexValues.join(`|`) + `\n`;
            writer.write(indexedLine);
        })
        .on('error', error => {
            console.error(error);
        })
        .on('end', () => {
            writer.end();
            console.log(`Finished writing transactions from ${input} to ${output_folder}`.green.bold);
            process.exit();
        });
}