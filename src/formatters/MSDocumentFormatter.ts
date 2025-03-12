import * as vscode from 'vscode';

export class MSDocumentFormatter implements vscode.DocumentFormattingEditProvider {
    provideDocumentFormattingEdits(
        document: vscode.TextDocument
    ): vscode.TextEdit[] {
        const text = document.getText();
        const lines = text.split('\n');
        const edits: vscode.TextEdit[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().startsWith('consciousness')) {
                const indent = line.match(/^\s*/)?.[0] || '';
                const formatted = `${indent}consciousness ${line.trim().split(' ')[1]} {`;
                edits.push(vscode.TextEdit.replace(
                    new vscode.Range(i, 0, i, line.length),
                    formatted
                ));
            }
        }

        return edits;
    }
}