@echo off
REM Windows script to prepare files for VPS deployment
REM This script prepares the files - actual deployment commands run on VPS

echo ==========================================
echo slotgame VPS Deployment Preparation
echo ==========================================
echo.

echo Checking configuration files...
if exist .env (
    echo [OK] .env file exists
    findstr /C:"APP_URL=http://ip or domain" .env >nul
    if %errorlevel% equ 0 (
        echo [OK] APP_URL is set correctly
    ) else (
        echo [WARNING] APP_URL may need updating
    )
) else (
    echo [ERROR] .env file not found!
)

if exist public\arcade_config.json (
    echo [OK] arcade_config.json exists
    findstr /C:"ip or domain" public\arcade_config.json >nul
    if %errorlevel% equ 0 (
        echo [OK] arcade_config.json configured correctly
    ) else (
        echo [WARNING] arcade_config.json may need updating
    )
)

if exist public\socket_config.json (
    echo [OK] socket_config.json exists
    findstr /C:"ip or domain" public\socket_config.json >nul
    if %errorlevel% equ 0 (
        echo [OK] socket_config.json configured correctly
    ) else (
        echo [WARNING] socket_config.json may need updating
    )
)

echo.
echo ==========================================
echo Files are ready for VPS deployment
echo ==========================================
echo.
echo Next steps on your VPS:
echo   1. Upload all files to VPS
echo   2. Run: chmod -R 775 storage bootstrap/cache
echo   3. Run: php artisan config:clear
echo   4. Run: php artisan cache:clear
echo   5. Ensure Apache/Nginx points to public/ directory
echo   6. Make sure mod_rewrite is enabled
echo.
pause

