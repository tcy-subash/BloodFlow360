# PowerShell script to run BloodFlow360 Unit Tests and output summaries
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   BloodFlow360 - Executing Unit Tests        " -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# Run dotnet test
dotnet test BloodFlow360.Application.UnitTests/BloodFlow360.Application.UnitTests.csproj --logger "console;verbosity=normal"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] All unit tests passed successfully!" -ForegroundColor Green
} else {
    Write-Host "`n[FAILURE] Some unit tests failed. Please review the output above." -ForegroundColor Red
}
