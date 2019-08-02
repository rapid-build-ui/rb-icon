/******************************
 * CREATE ICONS JSON FROM SVGS
 ******************************/
const Help       = require('./helpers');
const Paths      = require('./paths');
const IconLibs   = require('./icon-libs');

/* Constants
 ************/
const ICONS      = {} // populated in init()
const ICON_NAMES = {} // populated in init()

/* Helpers
 **********/
const Icons = {
	copy: {
		scripts: {
			toDest() { // :Promise<void>
				return Help.copy(Paths.dist.scripts.path, Paths.client.generated.path);
			}
		}
	},
	create: {
		json: {
			async icons() { // :Promise<void>
				for (const [namespace, lib] of Object.entries(IconLibs)) {
					const icons = await lib.getJsonIcons();
					Object.assign(ICONS, icons);
				}
				return Help.writeFile(Paths.dist.json.icons, JSON.stringify(ICONS, null, '\t'));
			},
			iconNames() { // :Promise<void>
				for (lib in ICONS) {
					ICON_NAMES[lib] = {};
					for (src in ICONS[lib]) {
						ICON_NAMES[lib][src] = [];
						for (icon in ICONS[lib][src]) {
							ICON_NAMES[lib][src].push(icon);
						}
					}
				}
				return Help.writeFile(Paths.dist.json.iconNames, JSON.stringify(ICON_NAMES, null, '\t'));
			}
		},
		scripts: {
			icons(json, minify = true) { // :Promise<void>
				const icons   = require(Paths.dist.json[json]);
				const minOpts = minify ? [] : [null, '\t'];
				const jsonStr = JSON.stringify(icons, ...minOpts);
				const js      = `export default ${jsonStr}`;
				return Help.writeFile(Paths.dist.scripts[json], js);
			}
		}
	}
}

const init = async () => { // :void
	await Icons.create.json.icons();
	await Icons.create.json.iconNames();
	const minify = true; // for testing
	await Icons.create.scripts.icons('icons', minify);
	await Icons.create.scripts.icons('iconNames', minify);
	await Icons.copy.scripts.toDest();
	console.log(`
		${`Icon scripts created:`.info}
		${Paths.client.generated.icons.replace(Paths.project.path,'')}
		${Paths.client.generated.iconNames.replace(Paths.project.path,'')}
	`.replace(/\t/g,'').trim().minor);
}

/* Export it!
 *************/
module.exports = init;