param(
    [int]$DockerWaitSeconds = 90,
    [int]$BackendWaitSeconds = 90,
    [int]$UiWaitSeconds = 90,
    [switch]$OpenBrowser
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$postgresDir = Join-Path $repoRoot "database\postgres"
$backendDir = Join-Path $repoRoot "services\userservice"
$uiDir = Join-Path $repoRoot "ui"
$dockerDesktop = "C:\Program Files\Docker\Docker\Docker Desktop.exe"

function Test-CommandSuccess {
    param([scriptblock]$Command)

    try {
        & $Command *> $null
        return $LASTEXITCODE -eq 0
    } catch {
        return $false
    }
}

function Wait-For {
    param(
        [string]$Name,
        [scriptblock]$Condition,
        [int]$TimeoutSeconds
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        if (& $Condition) {
            Write-Host "$Name is ready."
            return
        }
        Start-Sleep -Seconds 3
    }

    throw "$Name did not become ready within $TimeoutSeconds seconds."
}

Write-Host "Checking Docker..."
if (-not (Test-CommandSuccess { docker info })) {
    if (-not (Test-Path $dockerDesktop)) {
        throw "Docker Desktop was not found at $dockerDesktop. Start Docker Desktop manually, then rerun this script."
    }

    Write-Host "Starting Docker Desktop..."
    Start-Process -FilePath $dockerDesktop
}

Wait-For -Name "Docker" -TimeoutSeconds $DockerWaitSeconds -Condition {
    Test-CommandSuccess { docker info }
}

Write-Host "Starting PostgreSQL..."
Push-Location $postgresDir
try {
    docker compose up -d
} finally {
    Pop-Location
}

Wait-For -Name "PostgreSQL container" -TimeoutSeconds 60 -Condition {
    $status = docker inspect -f "{{.State.Running}}" myapp-postgres 2>$null
    $status -eq "true"
}

Write-Host "Starting Spring Boot userservice in a new PowerShell window..."
$backendCommand = "cd `"$backendDir`"; `$env:JAVA_TOOL_OPTIONS='-Djavax.net.ssl.trustStoreType=Windows-ROOT'; mvn spring-boot:run"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", $backendCommand -WorkingDirectory $backendDir

Wait-For -Name "Backend health endpoint" -TimeoutSeconds $BackendWaitSeconds -Condition {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/actuator/health" -UseBasicParsing -TimeoutSec 3
        $response.StatusCode -eq 200
    } catch {
        $false
    }
}

Write-Host "Starting Angular UI in a new PowerShell window..."
$uiCommand = "cd `"$uiDir`"; npm start"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", $uiCommand -WorkingDirectory $uiDir

Wait-For -Name "Angular UI" -TimeoutSeconds $UiWaitSeconds -Condition {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4200" -UseBasicParsing -TimeoutSec 3
        $response.StatusCode -eq 200
    } catch {
        $false
    }
}

Write-Host ""
Write-Host "Local Auth0 smoke-test stack is ready."
Write-Host "UI login:     http://localhost:4200/login"
Write-Host "Backend:      http://localhost:8080/actuator/health"
Write-Host "Swagger UI:   http://localhost:8080/swagger-ui.html"
Write-Host ""
Write-Host "When done testing, close the backend and UI PowerShell windows."
Write-Host "PostgreSQL can be stopped with: docker compose -f `"$postgresDir\docker-compose.yml`" down"

if ($OpenBrowser) {
    Start-Process "http://localhost:4200/login"
}
