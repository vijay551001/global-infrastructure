Write-Host "[CD PIPELINE] Initiating Local Continuous Deployment Sequence..." -ForegroundColor Cyan
git pull origin main
docker pull ghcr.io/vijay551001/server-monitor-app:latest
docker compose down
docker compose up -d --remove-orphans
Write-Host "[CD PIPELINE] Stack successfully updated and live on Port 80!" -ForegroundColor Green
docker compose ps