/**********
 * RB-ICON
 **********/
import { Element as PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import { DomIf as DomIf } from '../../../@polymer/polymer/lib/elements/dom-if.js';
import '../../../webfontloader/webfontloader.js'; // web components doesn't laod fonts natively

export class RbIcon extends PolymerElement {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.importPath = '/node_modules/@rapid-build-ui/rb-icon';
		WebFont.load({
			custom: {
				families: ['FontAwesome', 'devicons'],
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

	_iconKindMatched(kind) {
		if (!kind) {
			console.log('icon kind is required');
			return '';
		}
		kind = kind.toLowerCase();

		switch (true) {
			case kind.indexOf('devicons')==0:
				return `devicons ${kind}`
				break;
			default:
				return `fa fa-${kind}`;
		}
	}

	/* Template
	 ***********/
	static get template() {
		return `
			<link rel="stylesheet" href="[[importPath]]/styles/rb-icon.css">
			<i class$="[[_iconKindMatched(kind)]]"></i>
		`;
	}
}

customElements.define('rb-icon', RbIcon);
