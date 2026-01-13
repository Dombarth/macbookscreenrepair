# Add canonical tags to all model pages

$modelsDir = Join-Path $PSScriptRoot "models"
$modelDirs = Get-ChildItem -Path $modelsDir -Directory

$processed = 0
foreach ($dir in $modelDirs) {
    $folderName = $dir.Name
    $filePath = Join-Path $dir.FullName "index.html"
    
    if (Test-Path $filePath) {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        
        # Check if canonical already exists
        if ($content -notmatch 'rel="canonical"') {
            # Create canonical URL
            $canonicalUrl = "https://macbookscreenrepairsydney.com.au/models/$folderName/"
            $canonicalTag = "    <link rel=`"canonical`" href=`"$canonicalUrl`">"
            
            # Insert canonical after meta description
            $content = $content -replace '(<meta name="description"[^>]+>)', "`$1`n$canonicalTag"
            
            Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline
            $processed++
            Write-Host "Added canonical to: $folderName"
        } else {
            Write-Host "Canonical already exists: $folderName"
        }
    }
}

# Also update models/index.html
$modelsIndex = Join-Path $modelsDir "index.html"
if (Test-Path $modelsIndex) {
    $content = Get-Content -Path $modelsIndex -Raw -Encoding UTF8
    if ($content -notmatch 'rel="canonical"') {
        $canonicalTag = '    <link rel="canonical" href="https://macbookscreenrepairsydney.com.au/models/">'
        $content = $content -replace '(<meta name="description"[^>]+>)', "`$1`n$canonicalTag"
        Set-Content -Path $modelsIndex -Value $content -Encoding UTF8 -NoNewline
        $processed++
        Write-Host "Added canonical to: models/index.html"
    }
}

Write-Host ""
Write-Host "Done! Added canonical tags to $processed model pages."