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
	}

	ready() {
		super.ready();
	}

	/* Properties
	 ************/
	static get properties() {
		return {
			kind:	{
				type: String
			},
			source:	{
				type: String,
				value: ''
			}
		}
	}

	/* Computed Bindings
	 ********************/
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
