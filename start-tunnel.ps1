# =====================================================
# Script para mantener el túnel de Cloudflare activo
# Seguros Bolívar - Angular 20
# =====================================================

Write-Host "========================================" -ForegroundColor Green
Write-Host "  INICIANDO SERVIDOR + TUNEL PUBLICO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Cambiar al directorio del proyecto
Set-Location "C:\Users\caiglesias\Documents\bolivar-angular20-migration"

# Función para verificar si el puerto está en uso
function Test-Port {
    param($port)
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    return $null -ne $connection
}

# Iniciar servidor Angular si no está corriendo
if (-not (Test-Port 4201)) {
    Write-Host "[1/2] Iniciando servidor Angular en puerto 4201..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\caiglesias\Documents\bolivar-angular20-migration'; npx ng serve --port 4201 --host 0.0.0.0 --disable-host-check" -WindowStyle Minimized
    Write-Host "      Esperando 30 segundos para que inicie..." -ForegroundColor Gray
    Start-Sleep -Seconds 30
} else {
    Write-Host "[1/2] Servidor Angular ya está corriendo en puerto 4201" -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/2] Iniciando túnel de Cloudflare..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TUNEL ACTIVO - NO CERRAR ESTA VENTANA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "La URL pública aparecerá abajo:" -ForegroundColor White
Write-Host "(Busca la línea con 'trycloudflare.com')" -ForegroundColor Gray
Write-Host ""

# Bucle infinito para mantener el túnel activo
while ($true) {
    try {
        # Ejecutar cloudflared y esperar
        npx cloudflared tunnel --url http://localhost:4201
        
        # Si llega aquí, el túnel se cayó
        Write-Host ""
        Write-Host "[!] Túnel desconectado. Reconectando en 5 segundos..." -ForegroundColor Red
        Start-Sleep -Seconds 5
    }
    catch {
        Write-Host "[!] Error: $_" -ForegroundColor Red
        Write-Host "    Reintentando en 10 segundos..." -ForegroundColor Yellow
        Start-Sleep -Seconds 10
    }
}

