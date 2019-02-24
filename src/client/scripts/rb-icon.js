/**********
 * RB-ICON
 **********/
import { RbBase, props, html } from '../../rb-base/scripts/rb-base.js';
import template                from '../views/rb-icon.html';

export class RbIcon extends RbBase() {
	/* Lifecycle
	 ************/
	viewReady() { // :void
		super.viewReady && super.viewReady();
		this.rb.elms.rbSvg  = this.shadowRoot.querySelector('.rb-icon');
		this.rb.elms.rbPath = this.rb.elms.rbSvg.querySelector('path');
		this._updateIcon();
	}
	updated(prevProps, prevState) { // :void (runs before viewReady())
		if (super.updated) super.updated(prevProps, prevState);
		if (!this.rb.view.isReady) return;
		if (prevProps.kind === this.kind && prevProps.source === this.source) return;
		this._updateIcon(); // runs after view updated (required)
	}

	/* Properties
	 *************/
	static get props() { // :object
		return {
			kind: props.string,
			size: props.number,
			valign: props.string,
			source: Object.assign({}, props.string, {
				default: 'default'
			})
		};
	}

	/* Helpers
	 **********/
	_updateIcon() { // :void
		let libSvg, libPath;
		const { rbSvg, rbPath } = this.rb.elms;
		// try/catch incase of invalid css selector
		try {
			libSvg = this.shadowRoot.querySelector(`#${this.kind}`);
		} catch(e) {}
		// hide icon so it doesn't take up space
		if (!libSvg) {
			rbSvg.classList.add('hide');
			rbSvg.removeAttribute('viewBox');
			rbPath.removeAttribute('d');
			return;
		}
		// all good, update icon
		libPath = libSvg.querySelector('path');
		rbSvg.classList.remove('hide');
		rbSvg.setAttribute('viewBox', libSvg.getAttribute('viewBox'));
		rbPath.setAttribute('d', libPath.getAttribute('d'));
	}

	/* Template
	 ***********/
	render({ props }) { // :string
		return html template;
	}
}

customElements.define('rb-icon', RbIcon);