/**********
 * RB-ICON
 **********/
import { RbBase, props, html } from '../../rb-base/scripts/rb-base.js';
import view                    from '../../rb-base/scripts/public/view/directives.js';
import Icons                   from './icons.js';
import template                from '../views/rb-icon.html';
const FA_SOURCES = Object.keys(Icons.fa);

export class RbIcon extends RbBase() {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.state = {
			...super.state,
			hide: false,
			d: undefined,
			viewBox: undefined
		};
	}

	/* Properties
	 *************/
	static get props() { // :object
		return {
			kind: props.string,
			size: props.number,
			valign: props.string,
			source: Object.assign({}, props.string, {
				default: 'regular'
			})
		};
	}

	/* Observer
	 ***********/
	updating(prevProps, prevState) { // :void (runs before render() and viewReady())
		if (prevProps.kind === this.kind &&
			prevProps.source === this.source) return;
		this.__updateIcon();
	}

	/* Helpers
	 **********/
	__hideIcon() { // :void
		this.state.hide    = true;
		this.state.d       = undefined;
		this.state.viewBox = undefined;
	}

	__showIcon(icon) { // :void
		this.state.hide    = false;
		this.state.d       = icon.d;
		this.state.viewBox = icon.viewBox;
	}

	__updateIcon() { // :void
		this.kind   = this.kind.trim().toLowerCase();
		this.source = this.source.trim().toLowerCase();

		if (!this.kind) return this.__hideIcon();
		if (FA_SOURCES.indexOf(this.source) === -1) this.source = 'regular';

		const icons = Icons.fa[this.source];
		if (!icons) return this.__hideIcon();

		const icon = icons[this.kind];
		if (!icon) return this.__hideIcon();

		// all good show icon
		this.__showIcon(icon);
	}

	/* Template
	 ***********/
	render({ props, state }) { // :string
		return html template;
	}
}

customElements.define('rb-icon', RbIcon);