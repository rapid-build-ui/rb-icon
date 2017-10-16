/**********
 * RB-ICON
 **********/
import { Element as PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../webfontloader/webfontloader.js'; // web components doesn't laod fonts natively

export class RbIcon extends PolymerElement {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.importPath = '/node_modules/@rapid-build-ui/rb-icon';
		WebFont.load({
			custom: {
				families: ['FontAwesome'],
				urls: [`${this.importPath}/styles/rb-icon.css`]
			}
		})
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

	/* Template
	 ***********/
	static get template() {
		return `
			<link rel="stylesheet" href="[[importPath]]/styles/rb-icon.css">
			<i class="fa fa-user"></i> icon
		`;
	}
}

customElements.define('rb-icon', RbIcon);
