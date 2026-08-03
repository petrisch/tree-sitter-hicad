# tree-sitter output like PATH.MAC Parse: 0.79 ms 10495 bytes/ms (ERROR [184, 0] - [184, 3])
# open that file and bat the lines where the error occured

export def test_ts [
  --path(-p): string = "" # The path to the list of files
] {
  let res = (tree-sitter parse -q -s --paths $path | lines | drop 3)
  let file = {"file": "", "rest": ""}

  let pathSplit = (
      $res | each {|e|
      let m = ($e | parse -r '^(?<file>.*?\.MAC)\s*(?<rest>.*)$')

          {
              file: $m.0.file
              rest: ($m.0.rest | split row " "  | compact --empty)
          }
      }
  )
# print $pathSplit.1.rest

  let addLineArtifact = ($pathSplit | each {|entry|
      $entry | insert lineArtifact {
        if ( $entry.rest.4 | str contains "MISSING" ) {
            $entry.rest.6
        } else {
            $entry.rest.5
        }
  }})
# print $addLineArtifact

  let addLines  = ($addLineArtifact | each {|entry|
      $entry | insert line {
      ($entry | get lineArtifact | str trim --char "[" | str trim --char "," | into int)
  }})
# print $addLines

  let messages  = ($addLines | each {|entry|
      $entry | insert message {
      bat -r ($entry.line - 4):($entry.line + 3)  $"($entry.file)"
  }})

# output
  $messages | each {|m|
    print ""
    print $m.file
    print "_______"
    print $m.message
    print ""
  }
}
