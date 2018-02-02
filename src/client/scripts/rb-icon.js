/**********
 * RB-ICON
 **********/
import { Element as PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import { DomIf as DomIf } from '../../../@polymer/polymer/lib/elements/dom-if.js';
import template from '../views/rb-icon.html';

export class RbIcon extends PolymerElement {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.importPath = '/node_modules/@rapid-build-ui/rb-icon';
	}

	ready() {
		super.ready();
	}

	/* Properties
	 ************/
	static get properties() {
		return {
			kind:	{
				type: String,
				value: ''
			},
			source:	{
				type: String,
				value: 'regular'
			},
			size: {
				type: String,
				value: ''
			},
			bold: {
				type: Boolean,
				value: false

			}
		}
	}

	_iconKindMatched(kind) {
		if (!kind) {
			return '';
		}
	}

	_isSrc(src) {
		return this.source === src
	}



	/* Template
	 ***********/
	static get template() {
		return template;
	}
}

customElements.define('rb-icon', RbIcon);
