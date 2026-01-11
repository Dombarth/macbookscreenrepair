# Sitemap Generator for MacBook Screen Repair
# 
# Run this script to regenerate sitemap.xml whenever pages are added or removed.
# Usage: powershell -ExecutionPolicy Bypass -File generate-sitemap.ps1

$Domain = "https://macbookscreenrepairsydney.com.au"
$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Today = Get-Date -Format "yyyy-MM-dd"

Write-Host "Generating sitemap.xml..."

# Get all index.html files
$HtmlFiles = Get-ChildItem -Path $RootDir -Recurse -Filter "index.html" | 
    Where-Object { $_.DirectoryName -notlike "*node_modules*" -and $_.DirectoryName -notlike "*\.git*" } |
    Sort-Object FullName

# Start XML
$Xml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"@

foreach ($File in $HtmlFiles) {
    $RelativePath = $File.FullName.Replace($RootDir, "").Replace("\", "/").TrimStart("/")
    
    # Build URL
    if ($RelativePath -eq "index.html") {
        $Url = "$Domain/"
    } else {
        $Url = "$Domain/" + $RelativePath.Replace("/index.html", "/")
    }
    
    # Get last modified date
    $LastMod = $File.LastWriteTime.ToString("yyyy-MM-dd")
    
    # Set priority based on page type
    $Priority = "0.5"
    $ChangeFreq = "monthly"
    
    if ($RelativePath -eq "index.html") {
        $Priority = "1.0"
        $ChangeFreq = "weekly"
    } elseif ($RelativePath -like "services/index.html" -or $RelativePath -like "models/index.html" -or $RelativePath -like "areas/index.html" -or $RelativePath -like "pricing-guide/index.html" -or $RelativePath -like "book/index.html") {
        $Priority = "0.9"
        $ChangeFreq = "weekly"
    } elseif ($RelativePath -like "contact/index.html" -or $RelativePath -like "about/index.html") {
        $Priority = "0.8"
        $ChangeFreq = "monthly"
    } elseif ($RelativePath -like "services/*") {
        $Priority = "0.8"
        $ChangeFreq = "monthly"
    } elseif ($RelativePath -like "models/*") {
        $Priority = "0.7"
        $ChangeFreq = "monthly"
    } elseif ($RelativePath -like "areas/*") {
        $Priority = "0.6"
        $ChangeFreq = "monthly"
    } elseif ($RelativePath -like "warranty/*") {
        $Priority = "0.7"
        $ChangeFreq = "monthly"
    }
    
    $Xml += @"

  <url>
    <loc>$Url</loc>
    <lastmod>$LastMod</lastmod>
    <changefreq>$ChangeFreq</changefreq>
    <priority>$Priority</priority>
  </url>
"@
}

$Xml += @"

</urlset>
"@

# Write sitemap
$OutputPath = Join-Path $RootDir "sitemap.xml"
$Xml | Out-File -FilePath $OutputPath -Encoding UTF8 -NoNewline

$PageCount = ($HtmlFiles | Measure-Object).Count

Write-Host "Done! Sitemap generated successfully!"
Write-Host "Total pages: $PageCount"
Write-Host "Output: $OutputPath"