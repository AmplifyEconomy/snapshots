--- Drop indices (in order to copy)

DROP INDEX "tags_name";
DROP INDEX "tags_name_value";
DROP INDEX "tags_tx_id_name";

--- Recreate indices after copy