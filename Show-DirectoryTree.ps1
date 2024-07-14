Function Get-DirectoryTree {
    param (
        [string]$Path = (Get-Location),
        [string]$Exclude = "node_modules"
    )

    Process {
        Get-ChildItem -Path $Path -Recurse -Force | Where-Object {
            $_.PSIsContainer -and $_.FullName -notmatch $Exclude
        } | ForEach-Object {
            $RelativePath = $_.FullName.Substring($Path.Length + 1)
            Write-Output $RelativePath
            Get-ChildItem -Path $_.FullName -Recurse -File -Force | Where-Object {
                $_.FullName -notmatch $Exclude
            } | ForEach-Object {
                $FileRelativePath = $_.FullName.Substring($Path.Length + 1)
                Write-Output "|-- $FileRelativePath"
            }
        }
    }
}

Get-DirectoryTree
