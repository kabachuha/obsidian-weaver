import { ItemView, WorkspaceLeaf, Platform } from 'obsidian';

import { createRoot, Root } from "react-dom/client";
import React from 'react';

import { WEAVER_VIEW_TYPE } from '../constants';
import Weaver from '../main'

import { TabView } from './TabView';

export class WeaverView extends ItemView {
	private readonly plugin: Weaver;
	private root: Root;

	constructor(leaf: WorkspaceLeaf, plugin: Weaver) {
		super(leaf);
		this.plugin = plugin;
	}

	async onOpen(): Promise<void> {
		this.constructWeaverView();
	}

	async onClose(): Promise<void> {
	}

	onResize() {
		super.onResize();
	}

	getIcon(): string {
		return 'rotate-3d';
	}

	getDisplayText(): string {
		return 'Weaver';
	}	

	getViewType(): string {
		return WEAVER_VIEW_TYPE;
	}

	constructWeaverView() {
		const viewContent = this.containerEl.querySelector(
			".view-content"
		) as HTMLElement;

		if (viewContent) {
			viewContent.classList.add("weaver-view");
			this.appendWeaver(viewContent);
		} else {
			console.error("Could not find view content!");
		}
	}

	private appendWeaver(viewContent: HTMLElement) {
		this.root = createRoot(viewContent);
		this.root.render (
			<TabView plugin={ this.plugin } />
 		);
	}
}
