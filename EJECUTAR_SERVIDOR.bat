@echo off
echo ========================================
echo INICIANDO SERVIDOR ANGULAR
echo ========================================
echo.

cd /d "C:\Users\caiglesias\Documents\bolivar-angular20-migration"

echo Limpiando procesos Node anteriores...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo Configurando entorno de desarrollo...
call npm run config:env:dev

echo.
echo Iniciando servidor en puerto 4200...
echo Espera 60-90 segundos mientras compila...
echo.
echo Cuando veas "listening on localhost:4200", abre:
echo http://localhost:4200
echo.

call npm start

pause

