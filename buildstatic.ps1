$fileOrder = Get-Content -Path "scriptorder.txt"
$fileOrder | ForEach-Object { $name = "src/SBM/$($_).js"; Get-Content $name } | Out-File builds/static/SBM.js