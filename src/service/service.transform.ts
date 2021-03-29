import { statSync, createReadStream, createWriteStream } from 'fs';
import ProgressBar from 'progress';
import progress from 'progress-stream';
import { parse } from 'fast-csv';
import { INDICES } from '../Config';
import { Tag, tagValue } from '../utility/utility.tag';

export async function TransformFile(input: string, output: string, order: Array<string>) {
    const writer = createWriteStream(output, { flags: 'w' });
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
            const tags = row.tags ? (JSON.parse(row.tags)) : [] as Array<Tag>;
            const coreValues: Array<string> = [];
            const indexValues: Array<string> = [];
            
            for (let i = 0; i < order.length; i++) {
                const key = order[i];
                if (key === `tags`) {
                    coreValues.push(row[key].replace(/"/g, '\\"'));
                } else {
                    coreValues.push(row[key]);
                }
            }

            for (let i = 0; i < INDICES.length; i++) {
                const index = INDICES[i];
                const value = tagValue(tags, index);
                indexValues.push(value);
            }

            const indexedLine = coreValues.join(`|`) + `|` + indexValues.join(`|`);
            writer.write(indexedLine);
        })
        .on('error', error => {
            console.error(error);
        })
        .on('end', () => {
            writer.end();
            console.log(`Finished writing transactions from ${input} to ${output}`.green.bold);
            process.exit();
        });
}