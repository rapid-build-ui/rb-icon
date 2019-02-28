/******************************
 * CREATE ICONS JSON FROM SVGS
 ******************************/
const fs         = require('fs');
const path       = require('path');
const fsPromises = fs.promises;
const cwd        = process.cwd(); // project root
const IconLibs   = require(`${cwd}/scripts/icon-libs`);

/* Constants
 ************/
const CLIENT_ICONS_FILE_PATH = path.join(cwd, 'src', 'client', 'scripts', 'icons.js');
const ICON_LIBS_PATH         = path.join(cwd, 'artifacts', 'icons');
const ICONS_ARTIFACT_PATH    = path.join(ICON_LIBS_PATH, 'icons.json');
const FA_SVGS_PATH           = path.join(ICON_LIBS_PATH, 'font-awesome', 'svgs');
const ICONS                  = {} // populated in Icons.createJsonLibIcons()

/* Helpers
 **********/
const Icons = {
	async getSvgFilePaths(dir) { // :{}
		const svgsDirPath = path.join(ICON_LIBS_PATH, dir, 'svgs');
		let svgFilePaths  = await fsPromises.readdir(svgsDirPath);
		svgFilePaths.filter(dir => dir[0] !== '.'); // filter out things like '.DS_Store'
		svgFilePaths.forEach((file, i) => svgFilePaths[i] = path.join(svgsDirPath, file));
		return svgFilePaths;
	},
	async getSvgFileContents(svgFilePath) { // :string (file contents)
		const file  = await fsPromises.readFile(svgFilePath); // :Buffer
		return file.toString();
	},
	getJsonSvg(lib, svg) { // :{}
		const data = lib.getDataForJsonSvg(svg);
		const json = {};
		for (const [index, id] of data.ids.entries()) {
			json[id] = {
				d: data.ds[index],
				viewBox: data.viewBoxes[index]
			}
		}
		return json;
	},
	async createJsonLibIcons() { // :void
		for (const [namespace, lib] of Object.entries(IconLibs)) {
			ICONS[namespace] = {};
			const jsonDirPath = path.join(ICON_LIBS_PATH, lib.dir, 'json');
			if (!fs.existsSync(jsonDirPath)) await fsPromises.mkdir(jsonDirPath);
			const svgFilePaths = await Icons.getSvgFilePaths(lib.dir);
			for (const svgFilePath of svgFilePaths) {
				const svg            = await Icons.getSvgFileContents(svgFilePath);
				const jsonSvg        = Icons.getJsonSvg(lib, svg);
				const jsonFileName   = path.basename(svgFilePath, '.svg') + '.json';
				const styleNamespace = lib.getStyleNamespace(jsonFileName);
				const jsonFilePath   = path.join(jsonDirPath, jsonFileName);
				await fsPromises.writeFile(jsonFilePath, JSON.stringify(jsonSvg, null, '\t'));
				ICONS[namespace][styleNamespace] = jsonSvg;
			}
		}
	},
	async createJsonIconsArtifact() { // :void
		await fsPromises.writeFile(ICONS_ARTIFACT_PATH, JSON.stringify(ICONS, null, '\t'));
	},
	async createClientJsonIconsFile(unminified = false) { // :void
		const icons   = require(ICONS_ARTIFACT_PATH);
		const minOpts = !!unminified ? [null, '\t'] : [];
		const jsonStr = JSON.stringify(icons, ...minOpts);
		const js      = `export default ${jsonStr}`;
		await fsPromises.writeFile(CLIENT_ICONS_FILE_PATH, js);
	}
}

const init = async () => { // :void
	await Icons.createJsonLibIcons();
	await Icons.createJsonIconsArtifact();
	await Icons.createClientJsonIconsFile();
	// await Icons.createClientJsonIconsFile('unminified'); // for testing
	console.log(`\nICONS CREATED!\n${CLIENT_ICONS_FILE_PATH.replace(cwd,'')}\n`);
}

/* Work It!
 ***********/
init();