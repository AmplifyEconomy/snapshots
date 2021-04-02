import { list, write } from 'fs-jetpack';
import { OUTPUT_TRANSACTIONS } from './Config';

export async function SQL() {
    let sql = `#!/bin/bash
echo COPYing files please wait

psql -d arweave <<EOF

set statement_timeout to 60000000; commit;
show statement_timeout;
    
`;
    console.log(`Generating SQL commands for ${OUTPUT_TRANSACTIONS}`.green.bold);

    const items = list(OUTPUT_TRANSACTIONS);

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.indexOf('block') !== -1) {
            sql += `\\COPY blocks ("id", "previous_block", "mined_at", "height", "txs", "extended") FROM '${OUTPUT_TRANSACTIONS}/${item}' WITH (FORMAT CSV, HEADER, ESCAPE '\\', DELIMITER '|', FORCE_NULL("height"));\n`;
        }

        if (item.indexOf('transaction') !== -1) {
            sql += `\\COPY transactions ("format","id","signature","owner","owner_address","target","reward","last_tx","height","tags","quantity","content_type","data_size","data_root","App-Name","app","domain","namespace") FROM '${OUTPUT_TRANSACTIONS}/${item}' WITH (FORMAT CSV, HEADER, ESCAPE '\\', DELIMITER '|', FORCE_NULL("format", "height", "data_size"));\n`;
        }

        if (item.indexOf('tags') !== -1) {
            sql += `\\COPY tags ("tx_id", "index", "name", "value") FROM '${OUTPUT_TRANSACTIONS}/${item}' WITH (FORMAT CSV, HEADER, ESCAPE '\\', DELIMITER '|', FORCE_NULL(index));\n`;
        }
    }

    sql += `
EOF

echo COPY complete`;

write('bin/copy.sh', sql);
}

(async () => await SQL())();