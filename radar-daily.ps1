# Director Radar - daily collection runner
# Triggered by Windows Task Scheduler at user logon and at 08:03 daily.
# Guard: if radar-data.js was already rewritten today, skip (multiple boots per day run only once).
# NOTE: keep this file ASCII-only - Windows PowerShell 5.1 reads .ps1 as ANSI by default.

$radar = 'D:\kimi\ai-workbench\radar-data.js'
$log   = 'D:\kimi\ai-workbench\radar-daily.log'

if ((Test-Path $radar) -and (Get-Item $radar).LastWriteTime.Date -eq (Get-Date).Date) {
    Add-Content $log "[$(Get-Date -Format 'yyyy-MM-dd HH:mm')] already collected today, skipped"
    exit 0
}

Add-Content $log "[$(Get-Date -Format 'yyyy-MM-dd HH:mm')] collection started"
Set-Location 'D:\kimi'
$env:PYTHONIOENCODING = 'utf-8'

& 'C:\Users\Admin\.kimi-code\bin\kimi.exe' -p 'Please open and strictly follow the instructions in D:\kimi\ai-workbench\radar-task.md to run today''s director-radar collection task.' *>> $log

Add-Content $log "[$(Get-Date -Format 'yyyy-MM-dd HH:mm')] collection process exited (exit=$LASTEXITCODE)"
