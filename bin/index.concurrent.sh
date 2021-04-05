#!/bin/bash
echo Indexing database please wait

sudo -u postgres psql -d arweave <<EOF

set statement_timeout to 60000000; commit;
show statement_timeout;

CREATE INDEX CONCURRENTLY "transactions_height" ON transactions USING HASH ("height");
CREATE INDEX CONCURRENTLY "transactions_target" ON transactions USING HASH ("target");
CREATE INDEX CONCURRENTLY "transactions_owner_address" ON transactions USING HASH ("owner_address");
CREATE INDEX CONCURRENTLY "index_namespace_transactions" ON transactions USING HASH ("namespace");
CREATE INDEX CONCURRENTLY "index_domain_transactions" ON transactions USING HASH ("domain");
CREATE INDEX CONCURRENTLY "index_app_transactions" ON transactions USING HASH ("app");
CREATE INDEX CONCURRENTLY "index_App-Name_transactions" ON transactions USING HASH ("App-Name");

CREATE INDEX CONCURRENTLY "tags_name" ON tags USING HASH ("name");
CREATE INDEX CONCURRENTLY "tags_name_value" ON tags USING BTREE ("name", "value");
CREATE INDEX CONCURRENTLY "tags_tx_id_name" ON tags USING BTREE ("tx_id", "name");

EOF

echo Finished indexing database