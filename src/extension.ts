import * as vscode from 'vscode';
import { MSDocumentFormatter } from './formatters/MSDocumentFormatter';

export function activate(context: vscode.ExtensionContext) {
    const msProvider = vscode.languages.registerDocumentFormattingEditProvider(
        { language: 'mindscript', scheme: 'file' },
        new MSDocumentFormatter()
    );

    context.subscriptions.push(msProvider);
}

export function deactivate() {}
