yarn-all-workspaces
===================

CLI utility to help execute yarn commands in every workspace in a project

-------------------------------------------


Installation
------------
Install via yarn
```sh
$> yarn add yarn-all-workspaces
```



Usage
-----
`yarn all-workspaces [--parallel|-p] <command-to-run>`

### Example 1
Execute `yarn run clean` in each workspace sequentially
```sh
$> yarn all-workspaces run clean
```

### Example 2
Execute `yarn run build` in each workspace _in parallel_.
```sh
$> yarn all-workspaces --parallel run build
```

### Example 3
Additional arguments will be passed to the yarn invocation in each workspace.
```sh
$> yarn all-workspaces run build --watch
```