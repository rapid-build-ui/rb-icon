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
				type: String,
				value: 'default'
			}
		}
	}

	/* Computed Bindings
	 ********************/
	_size(size) { // :string
		return size ? `font-size: ${size}em;` : null;
	}
	_source(source, key) { // :boolean
		if (!source && key === 'default') return true;
		return source === key;
	}

	/* Template
	 ***********/
	static get template() {
		return html template;
	}
}

customElements.define('rb-icon', RbIcon);
