/**********
 * RB-ICON
 **********/
import { RbBase, props, html } from '../../base/scripts/base.js';
import Converter               from '../../base/scripts/public/props/converters.js';
import View                    from '../../base/scripts/public/view/directives.js';
import Icons                   from './icons.js';
import template                from '../views/rb-icon.html';
const FA_SOURCES = Object.keys(Icons.fa);

/* Component
 ************/
export class RbIcon extends RbBase() {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.version = '0.0.17';
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
			flip: props.string,
			kind: props.string,
			size: props.number,
			speed: props.number,
			rotate: props.number,
			valign: props.string,
			library: Object.assign({}, props.string, {
				default: 'fa'
			}),
			source: Object.assign({}, props.string, {
				default: 'regular'
			}),
			burst: Object.assign({}, props.boolean, {
				deserialize: Converter.valueless
			}),
			pulse: Object.assign({}, props.boolean, {
				deserialize: Converter.valueless
			}),
			spin: Object.assign({}, props.boolean, {
				deserialize: Converter.valueless
			})
		};
	}

	/* Observer
	 ***********/
	updating(prevProps, prevState) { // :void (runs before render() and viewReady())
		if ((typeof prevProps.flip === 'undefined' && this.flip) ||
			(typeof prevProps.flip !== 'undefined' && prevProps.flip !== this.flip))
			this.__flipIcon();

		if ((typeof prevProps.rotate === 'undefined' && this.rotate) ||
			(typeof prevProps.rotate !== 'undefined' && prevProps.rotate !== this.rotate))
			this.__rotateIcon();

		if (prevProps.kind === this.kind &&
			prevProps.source === this.source &&
			prevProps.library === this.library) return;

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

	__flipIcon() { // :void (must rotate host to not mess up svg animations)
		let flip = this.flip.trim().toLowerCase();
		flip = flip === 'horizontal' ? '-1, 1'  :
			   flip === 'vertical'   ? '1, -1'  :
			   flip === 'both'       ? '-1, -1' :
			   null;
		this.__flip = flip ? `scale(${flip})` : flip;
		if (!this.__flip) return;
		const rotate = this.__rotate || '';
		this.style.transform = `${this.__flip} ${rotate}`;
	}

	__rotateIcon() { // :void (must rotate host to not mess up svg animations)
		const flip = this.__flip || '';
		this.__rotate = `rotate(${this.rotate}deg)`;
		this.style.transform = `${this.__rotate} ${flip}`;
	}

	__updateIcon() { // :void
		this.kind    = this.kind.trim().toLowerCase();
		this.source  = this.source.trim().toLowerCase();
		this.library = this.library.trim().toLowerCase();

		if (!this.kind) return this.__hideIcon();
		if (this.library === 'fa' && FA_SOURCES.indexOf(this.source) === -1)
			this.source = 'regular';

		const lib = Icons[this.library];
		if (!lib) return this.__hideIcon();

		const icons = lib[this.source];
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