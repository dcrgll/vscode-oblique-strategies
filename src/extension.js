const vscode = require("vscode")
const strategies = require("./strategies")

let oblique

function updateStatusBar() {
  oblique.text = `$(note)`
  return oblique.show()
}

function activate(context) {
  const command = "sample.showSelectionCount"
  context.subscriptions.push(
    vscode.commands.registerCommand(command, () => {
      oblique.text = strategies[Math.floor(Math.random() * strategies.length)]
    })
  )
  oblique = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3)
  oblique.command = command

  context.subscriptions.push(oblique)
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBar)
  )
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBar)
  )
  updateStatusBar()
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
