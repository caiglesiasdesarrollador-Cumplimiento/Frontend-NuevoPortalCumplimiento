# Script para limpiar errores de Watchpack en Windows
# Ejecutar: .\scripts\clean-watchpack.ps1

Write-Host "🧹 Limpiando errores de Watchpack..." -ForegroundColor Green

# Limpiar caché de Angular
Write-Host "📁 Limpiando caché de Angular..." -ForegroundColor Yellow
if (Test-Path ".angular") {
    Remove-Item -Recurse -Force ".angular"
    Write-Host "✅ Caché de Angular eliminado" -ForegroundColor Green
}

# Limpiar node_modules y reinstalar
Write-Host "📦 Limpiando node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ node_modules eliminado" -ForegroundColor Green
}

# Limpiar package-lock.json
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "✅ package-lock.json eliminado" -ForegroundColor Green
}

# Reinstalar dependencias
Write-Host "📥 Reinstalando dependencias..." -ForegroundColor Yellow
npm install
Write-Host "✅ Dependencias reinstaladas" -ForegroundColor Green

# Limpiar dist
Write-Host "🗑️ Limpiando directorio dist..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Directorio dist eliminado" -ForegroundColor Green
}

Write-Host "🎉 Limpieza completada. Ahora ejecuta: npm start" -ForegroundColor Green
