$loadOrders = Get-Content -Path "loadorders.json" | ConvertFrom-Json
Copy-Item -Path "src/example.html" -Destination "builds/loader/example.html"
Copy-Item -Path "src/loader.js" -Destination "builds/loader/loader.js"

$newLoader = "builds/loader/loader.js"
$prevContent = Get-Content -Path "src/loader.js" -Raw

Set-Content -Path $newLoader -Value 'const base = "/src/SBM/";'
Add-Content -Path $newLoader -Value "const scripts = ["
$loadOrders.scripts.urls | ForEach-Object {Add-Content -Path $newLoader -Value "'$($loadOrders.scripts.base)$($_).js', "}
Add-Content -Path $newLoader -Value "];"
Add-Content -Path $newLoader -Value $prevContent

$loadOrders.css.urls | ForEach-Object {Add-Content -Path $newLoader -Value "appendStyleSheet('$($loadOrders.css.base)$($_).css');"}

Add-Content -Path "builds/loader/example.html" -Value '<script src="loader.js"></script>'