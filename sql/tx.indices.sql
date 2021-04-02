--- Drop Indices (in order to copy)

DROP INDEX "index_App-Name_transactions";
DROP INDEX "index_app_transactions";
DROP INDEX "index_domain_transactions";
DROP INDEX "index_namespace_transactions";
DROP INDEX "transactions_owner_address";
DROP INDEX "transactions_target";
DROP INDEX "transactions_height";

--- Recreate indices after copy