param(
    [string]$BaseUrl = "http://localhost:8080",
    [string]$AccessToken = ""
)

$ErrorActionPreference = "Stop"

function Invoke-SmokeRequest {
    param(
        [string]$Name,
        [string]$Uri,
        [int]$ExpectedStatus,
        [hashtable]$Headers = @{}
    )

    try {
        $response = Invoke-WebRequest -Uri $Uri -Headers $Headers -UseBasicParsing -TimeoutSec 10
        $status = [int]$response.StatusCode
        $body = $response.Content
    } catch {
        if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
            $status = [int]$_.Exception.Response.StatusCode
            $body = ""
        } else {
            throw
        }
    }

    if ($status -ne $ExpectedStatus) {
        throw "$Name expected HTTP $ExpectedStatus but received HTTP $status."
    }

    Write-Host "[PASS] $Name returned HTTP $status."
    return $body
}

$normalizedBaseUrl = $BaseUrl.TrimEnd("/")

Write-Host "Auth0 API smoke target: $normalizedBaseUrl"

Invoke-SmokeRequest `
    -Name "Health endpoint" `
    -Uri "$normalizedBaseUrl/actuator/health" `
    -ExpectedStatus 200 | Out-Null

Invoke-SmokeRequest `
    -Name "Current user rejects anonymous request" `
    -Uri "$normalizedBaseUrl/api/v1/auth/me" `
    -ExpectedStatus 401 | Out-Null

Invoke-SmokeRequest `
    -Name "Current user rejects invalid bearer token" `
    -Uri "$normalizedBaseUrl/api/v1/auth/me" `
    -ExpectedStatus 401 `
    -Headers @{ Authorization = "Bearer invalid-smoke-token" } | Out-Null

if ($AccessToken.Trim()) {
    $body = Invoke-SmokeRequest `
        -Name "Current user accepts supplied Auth0 access token" `
        -Uri "$normalizedBaseUrl/api/v1/auth/me" `
        -ExpectedStatus 200 `
        -Headers @{ Authorization = "Bearer $AccessToken" }

    Write-Host ""
    Write-Host "Current-user response:"
    Write-Host $body
} else {
    Write-Host ""
    Write-Host "Skipped valid-token check because -AccessToken was not provided."
    Write-Host "After browser login, provide a real Auth0 API access token to verify signed-in profile sync."
}
