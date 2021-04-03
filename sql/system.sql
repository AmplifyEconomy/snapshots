--- Default suggested Postgres configuration for Gateways
--- Please offer suggestions and criticism via Github issues, very appreciated and open to them

--- This configuration was designed for a 16 core 128 GB RAM server

ALTER SYSTEM SET max_connections = '1000';
ALTER SYSTEM SET shared_buffers = '8GB';
ALTER SYSTEM SET effective_cache_size = '96GB';
ALTER SYSTEM SET maintenance_work_mem = '2GB';
ALTER SYSTEM SET checkpoint_completion_target = '0.9';
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = '100';
ALTER SYSTEM SET random_page_cost = '2.5';
ALTER SYSTEM SET effective_io_concurrency = '200';
ALTER SYSTEM SET work_mem = '32GB';
ALTER SYSTEM SET min_wal_size = '1GB';
ALTER SYSTEM SET max_wal_size = '64GB';
ALTER SYSTEM SET max_worker_processes = '16';
ALTER SYSTEM SET max_parallel_workers_per_gather = '16';
ALTER SYSTEM SET max_parallel_workers = '16';
ALTER SYSTEM SET max_parallel_maintenance_workers = '4';
ALTER SYSTEM SET autovacuum_vacuum_scale_factor = '0.1';
ALTER SYSTEM SET autovacuum_max_workers = '8';

--- Do a non intrusive reload after altering system settings

SELECT pg_reload_conf();