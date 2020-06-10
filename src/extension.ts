/* eslint-disable @typescript-eslint/no-var-requires */
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;
const oblique = require('oblique-strategies');

export function activate({ subscriptions }: vscode.ExtensionContext) {

	// register a command that is invoked when the status bar
	// item is selected
	const myCommandId = 'sample.showSelectionCount';
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		myStatusBarItem.text = oblique.draw();
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	myStatusBarItem.text = `$(zap)`;
	myStatusBarItem.show();
}


