"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const stylus = require("stylus");
const fs = require("fs");
const path = require("path");
const STYLUS_EXT = '.styl';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let time = new Date().toLocaleDateString();
    vscode.window.showInformationMessage(time);
    let stylusDiagnosticCollection = vscode.languages.createDiagnosticCollection('stylus');
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(stylusDiagnosticCollection);
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('compile.stylus', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
    });
    // compile less on save when file is dirty
    const didSaveEvent = vscode.workspace.onDidSaveTextDocument(document => {
        if (document.fileName.endsWith(STYLUS_EXT)) {
            let content = document.getText();
            stylus.render(content, function (err, css) {
                console.log(document);
                let stylusPath = path.dirname(document.fileName);
                let fileName = path.basename(document.fileName, '.styl') + '.css';
                let file = path.join(stylusPath, fileName);
                fs.writeFile(file, css, function (err) {
                    if (err) {
                        return false;
                    }
                });
            });
        }
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(didSaveEvent);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map