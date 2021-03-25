import { createWriteStream } from 'fs';
import { split, mapSync } from 'event-stream';
import { get } from 'superagent';
import { RemapLine } from './service.map';

export async function TransformFile(input: string, output: string, map: Array<number>) {
    const write = createWriteStream(output);
    const read = get(input);

    read.pipe(split());
    
    read.pipe(
        mapSync((line: string) => {
            const keys = line.split(',');
            const writableValue = RemapLine(keys, map);
            write.write(writableValue);
        })
    );

    read.on('error', error => {
        console.error(error);
    });

    write.end();
}