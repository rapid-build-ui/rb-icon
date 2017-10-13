/**********
 * RB-ICON
 **********/
import { Element as PolymerElement } from '../../../@polymer/polymer/polymer-element.js';

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
				type: String,
				value: ''
			}
		}
	}

	/* Computed Bindings
	 ********************/

	/* Template
	 ***********/
	static get template() {
		return `
			<link rel="stylesheet" href="../../../font-awesome/css/font-awesome.css">
			<link rel="stylesheet" href="../styles/rb-icon.css">
			<i class$="fa fa-[[kind]]"></i>
		`;
	}
}

customElements.define('rb-icon', RbIcon);
