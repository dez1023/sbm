$fileOrder = Get-Content -Path "scriptorder.txt"
Copy-Item -Path "src/example.html" -Destination "builds/loader/example.html"
Copy-Item -Path "src/loader.js" -Destination "builds/loader/loader.js"

$newLoader = "builds/loader/loader.js"
$prevContent = Get-Content -Path "src/loader.js" -Raw

Set-Content -Path $newLoader -Value 'const base = "https://dez1023.github.io/sbm/src/SBM/";'
Add-Content -Path $newLoader -Value "const scripts = ["
$fileOrder | ForEach-Object {Add-Content -Path $newLoader -Value "'scripts/$($_).js', "}
Add-Content -Path $newLoader -Value "];"
Add-Content -Path $newLoader -Value $prevContent

Add-Content -Path "builds/loader/example.html" -Value '<script src="loader.js"></script>'