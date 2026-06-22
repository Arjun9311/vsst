#!/bin/bash
# Database Backup Script for VS Seva Trust to S3-Compatible storage (Backblaze B2)
# Triggered via a daily cron job on the production VPS
set -e

DB_NAME="seva_db"
BACKUP_DIR="/var/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
FILENAME="${DB_NAME}_backup_${DATE}.sql.gz"
B2_BUCKET="s3://seva-db-backups"

echo "Starting database backup for ${DB_NAME} at $(date)..."
mkdir -p "${BACKUP_DIR}"

# Export and compress PG database dump
# Note: Requires pg_dump installed on the host and standard PG password environment credentials configured
pg_dump -h localhost -U postgres "${DB_NAME}" | gzip > "${BACKUP_DIR}/${FILENAME}"

echo "Database dump generated successfully: ${FILENAME} (Size: $(du -sh ${BACKUP_DIR}/${FILENAME} | cut -f1))"

# Check if AWS CLI is installed and configured
if command -v aws &> /dev/null; then
  echo "Uploading backup to S3/B2 storage..."
  aws s3 cp "${BACKUP_DIR}/${FILENAME}" "${B2_BUCKET}/${FILENAME}" --endpoint-url https://s3.us-west-004.backblazeb2.com
  echo "Upload complete!"
else
  echo "Warning: AWS CLI not found. Skipping remote S3 upload. Backup preserved locally."
fi

# Keep only the last 30 days of backup files locally
echo "Pruning backups older than 30 days..."
find "${BACKUP_DIR}" -type f -mtime +30 -name "*.sql.gz" -delete

echo "Database maintenance process finished successfully."
