--- Create Temporary Tables

CREATE TABLE transactions_temp AS SELECT * FROM transactions;
CREATE TABLE tags_temp AS SELECT * FROM tags;

--- Make sure to increase statement timeout due to time to complete indexing

SET statement_timeout TO 60000000;
COMMIT;
show statement_timeout;

--- After COPYing data to temporary tables insert into actual table

INSERT INTO tags("tx_id", "index", "name", "value") SELECT "tx_id", "index", "name", "value" FROM tags_temp;
INSERT INTO transactions("format","id","signature","owner","owner_address","target","reward","last_tx","height","tags","quantity","content_type","data_size","data_root","App-Name","app","domain","namespace") SELECT "format","id","signature","owner","owner_address","target","reward","last_tx","height","tags","quantity","content_type","data_size","data_root","App-Name","app","domain","namespace" FROM transactions;

--- Delete Temporary Tables

DROP TABLE tags_temp;
DROP TABLE transactions_temp;