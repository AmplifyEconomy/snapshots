#!/bin/bash
echo Indexing database please wait

sudo -u postgres psql -d arweave <<EOF

set statement_timeout to 200000000; commit;
show statement_timeout;

CREATE INDEX "transactions_height" ON transactions USING HASH ("height");
CREATE INDEX "transactions_target" ON transactions USING HASH ("target");
CREATE INDEX "transactions_owner_address" ON transactions USING HASH ("owner_address");
CREATE INDEX "index_namespace_transactions" ON transactions USING HASH ("namespace");
CREATE INDEX "index_domain_transactions" ON transactions USING HASH ("domain");
CREATE INDEX "index_app_transactions" ON transactions USING HASH ("app");
CREATE INDEX "index_App-Name_transactions" ON transactions USING HASH ("App-Name");

CREATE INDEX  "tags_name" ON tags USING HASH ("name");
CREATE INDEX  "tags_name_value" ON tags USING BTREE ("name", "value");
CREATE INDEX  "tags_tx_id_name" ON tags USING BTREE ("tx_id", "name");

EOF

echo Finished indexing database