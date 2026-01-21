#!/bin/bash
# VPS Deployment Script for slotgame
# Run this on your VPS server (ip or domain)

echo "=========================================="
echo "slotgame VPS Deployment Script"
echo "=========================================="
echo ""

# Set proper file permissions
echo "Setting file permissions..."
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || chown -R apache:apache storage bootstrap/cache 2>/dev/null

# Clear Laravel caches
echo "Clearing Laravel caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Optimize for production (if PHP 8.2+)
echo "Optimizing application..."
php artisan config:cache 2>/dev/null || echo "Config cache skipped (PHP version)"
php artisan route:cache 2>/dev/null || echo "Route cache skipped (PHP version)"

echo ""
echo "=========================================="
echo "Deployment complete!"
echo "=========================================="
echo ""
echo "Verify configuration:"
echo "  - APP_URL should be: http://ip or domain"
echo "  - SITE_DOMAIN should be: ip or domain"
echo "  - Check arcade_config.json and socket_config.json"
echo ""

