/**********
 * RB-ICON
 **********/
import { props, withComponent } from '../../../skatejs/dist/esnext/index.js';
import { html, withRenderer } from './renderer.js';
import template from '../views/rb-icon.html';

export class RbIcon extends withComponent(withRenderer()) {
	/* Properties
	 ************/
	static get props() {
		return {
			kind: props.string,
			size: props.number,
			source: Object.assign({}, props.string, {
				default: 'default'
			})
		};
	}

	/* Lifecycle
	 ************/
	childrenUpdated() { // :void (timeout to ensure template is rendered)
		setTimeout(() => {
			let spriteSvg    = null;
			let spritePath   = null;
			const activeSvg  = this.shadowRoot.querySelector('.rb-icon');
			const activePath = activeSvg.querySelector('path');
			try { // incase of invalid css selector
				spriteSvg = this.shadowRoot.querySelector(`#${this.props.kind}`);
			} catch {}
			if (!spriteSvg) {
				activeSvg.classList.add('hide');
				activeSvg.removeAttribute('viewBox');
				activePath.removeAttribute('d');
				return;
			}
			activeSvg.classList.remove('hide')
			spritePath = spriteSvg.querySelector('path');
			activeSvg.setAttribute('viewBox', spriteSvg.getAttribute('viewBox'));
			activePath.setAttribute('d', spritePath.getAttribute('d'));
		});
	}

	/* Template
	 ***********/
	render({ size, source }) {
		return html template;
	}
}

customElements.define('rb-icon', RbIcon);