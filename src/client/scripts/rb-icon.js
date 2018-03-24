/**********
 * RB-ICON
 **********/
import { PolymerElement, html } from '../../../@polymer/polymer/polymer-element.js';
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
			size: {
				type: Number
			},
			source:	{
				type: String
			}
		}
	}

	/* Computed Bindings
	 ********************/
	_size(size) { // :string
		if (!size) return;
 		return `font-size: ${size}em;`
 	}
	_src(src) { // :string
		return this.source === src
	}

	/* Template
	 ***********/
	static get template() {
		return html template;
	}
}

customElements.define('rb-icon', RbIcon);
