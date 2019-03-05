/************************************
 * CUSTOM CODE FOR EACH ICON LIBRARY
 ************************************/
const path = require('path');

const IconLibs = { // keys are the lib's namespace
	'fa': {
		dir: 'font-awesome',
		getStyleNamespace(fileName) { // :string
			let ns = path.basename(fileName, '.json'); // ex: fa-brands.json -> fa-brands
			return ns.split('-')[1];                   // ex: fa-brands -> brands
		},
		getDataForJsonSvg(svg) { // :{ ids: [], viewBoxes: [], ds: [] }
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