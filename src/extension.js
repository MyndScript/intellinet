const { vscode } = require('./utils/internalNodeModules');

function activate(context) {
    console.log('MindScript extension is now active!');

    let disposable = vscode.commands.registerCommand(
        'mindscript.activateQuantumFlow',
        function () {
            vscode.window.showInformationMessage('Quantum Flow Activated!');
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
