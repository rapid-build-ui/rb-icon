/************************************
 * CUSTOM CODE FOR EACH ICON LIBRARY
 ************************************/
const Help  = require('./helpers');
const Paths = require('./paths');

const IconLibs = { // keys are the lib's namespace
	'fa': {
		async getJsonIcons() { // :{ lib: { src: { icon: { d: '', viewBox: '' } } } }
			let svgSrcPaths = await Help.readdir(Paths.fa.sprites);
			svgSrcPaths = svgSrcPaths.map((file) => file = `${Paths.fa.sprites}/${file}`);
			for (const svgPath of svgSrcPaths) {
				const svg          = await Help.getFileContents(svgPath);
				const jsonSvg      = this._getJsonSvg(svg);
				const jsonFileName = Help.getFileName(svgPath, false) + '.json';
				const jsonDestPath = `${Paths.dist.json.fa.path}/${jsonFileName}`;
				await Help.writeFile(jsonDestPath, JSON.stringify(jsonSvg, null, '\t'));
			}
			let svgDestPaths = await Help.readdir(Paths.dist.json.fa.path);
			svgDestPaths = svgDestPaths.map((file) => file = `${Paths.dist.json.fa.path}/${file}`);
			const jsonIcons = { fa: {} };
			for (const svgPath of svgDestPaths) {
				const json    = require(svgPath);
				const srcName = Help.getFileName(svgPath, false);
				jsonIcons.fa[srcName] = json;
			}
			await Help.writeFile(Paths.dist.json.fa.icons, JSON.stringify(jsonIcons, null, '\t'));
			return jsonIcons;
		},
		_getJsonSvg(svg) { // :{ icon: { d: '', viewBox: '' } }
			const data = this._getDataForJsonSvg(svg);
			const json = {};
			for (const [index, id] of data.ids.entries()) {
				json[id] = {
					d: data.ds[index],
					viewBox: data.viewBoxes[index]
				}
			}
			return json;
		},
		_getDataForJsonSvg(svg) { // :{ ids: [], viewBoxes: [], ds: [] }
			const data = {};
			data.ids       = svg.match(/(?<=symbol[^<]+?id=").+?(?=")/g);      // get symbol ids
			data.viewBoxes = svg.match(/(?<=symbol[^<]+?viewBox=").+?(?=")/g); // get symbol viewBoxes
			data.ds        = svg.match(/(?<=path[^<]+?d=").+?(?=")/g);         // get path ds
			return data;
		}
	}
};

/* Export It!
 *************/
module.exports = IconLibs;