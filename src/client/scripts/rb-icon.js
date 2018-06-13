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
	connectedCallback() {
		super.connectedCallback();
		this._elms = {
			icon: {
				elm:     null,
				viewBox: null
			},
			path: {
				elm: null,
				d:   null
			}
		};
		this._elms.icon.elm = this.root.querySelector('#rb-icon');
		this._elms.path.elm = this._elms.icon.elm.querySelector('path');
	}

	/* Properties
	 ************/
	static get properties() {
		return {
			kind:	{
				type: String,
				observer: '_iconChanged'
			},
			size: {
				type: Number
			},
			source:	{
				type: String,
				value: 'default',
				observer: '_iconChanged'
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

	/* Observers
	 ************/
	_iconChanged(newVal, oldVal) { // :void
		// timeout to ensure template is rendered
		setTimeout(() => {
			if (!this._elms) return;
			const newElms = {
				icon: {
					elm:     null,
					viewBox: null
				},
				path: {
					elm: null,
					d:   null
				}
			};

			// set id selector
			let id = this.source || 'default';
				id = `#${id}-icons #${this.kind}`;

			if (id.includes('{')) return; // invalid css selector TODO: polish

			// set icon elm
			newElms.icon.elm = this.root.querySelector(id);

			// handle invalid icon kind and or source
			if (!newElms.icon.elm) {
				this._elms.icon.elm.classList.add('hide');
				this._elms.icon.elm.removeAttribute('viewBox');
				this._elms.path.elm.removeAttribute('d');
				return;
			} else {
				this._elms.icon.elm.classList.remove('hide');
			}

			// set path elm
			newElms.path.elm = newElms.icon.elm.querySelector('path');

			// set attrs
			newElms.icon.viewBox = newElms.icon.elm.getAttribute('viewBox');
			newElms.path.d       = newElms.path.elm.getAttribute('d');

			const isActiveIcon = newElms.icon.viewBox === this._elms.icon.viewBox &&
								 newElms.path.d       === this._elms.path.d;

			if (isActiveIcon) return; // icon didn't change

			// update global elms in dom
			this._elms.icon.elm.setAttribute('viewBox', newElms.icon.viewBox);
			this._elms.path.elm.setAttribute('d',       newElms.path.d);

			// update global elms props
			this._elms.icon.viewBox = newElms.icon.viewBox;
			this._elms.path.d       = newElms.path.d;
		});
	}

	/* Template
	 ***********/
	static get template() {
		return html template;
	}
}

customElements.define('rb-icon', RbIcon);
