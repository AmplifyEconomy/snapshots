--- Drop Indices (in order to copy)

DROP INDEX "index_App-Name_transactions";
DROP INDEX "index_app_transactions";
DROP INDEX "index_domain_transactions";
DROP INDEX "index_namespace_transactions";
DROP INDEX "transactions_owner_address";
DROP INDEX "transactions_target";
DROP INDEX "transactions_height";

51273
58962
58651

--- Make sure to increase statement timeout due to time to complete indexing

SET statement_timeout TO 60000000;
COMMIT;
show statement_timeout;

--- Recreate indices after copy

CREATE INDEX "transactions_height" ON transactions USING HASH ("height");
CREATE INDEX "transactions_target" ON transactions USING HASH ("target");
CREATE INDEX "transactions_owner_address" ON transactions USING HASH ("owner_address");
CREATE INDEX "index_namespace_transactions" ON transactions USING HASH ("namespace");
CREATE INDEX "index_domain_transactions" ON transactions USING HASH ("domain");
CREATE INDEX "index_app_transactions" ON transactions USING HASH ("app");
CREATE INDEX "index_App-Name_transactions" ON transactions USING HASH ("App-Name");