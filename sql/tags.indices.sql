--- Drop indices (in order to copy)

DROP INDEX "tags_name";
DROP INDEX "tags_name_value";
DROP INDEX "tags_tx_id_name";

--- Make sure to increase statement timeout due to time to complete indexing

SET statement_timeout TO 60000000;
COMMIT;
show statement_timeout;

--- Recreate indices after copy

CREATE INDEX "tags_name" ON tags USING HASH ("name");
CREATE INDEX "tags_name_value" ON tags USING BTREE ("name", "value");
CREATE INDEX "tags_tx_id_name" ON tags USING BTREE ("tx_id", "name");