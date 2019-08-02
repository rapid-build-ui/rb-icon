/***************
 * PATHS CONFIG
 ***************/
const cwd           = process.cwd(); // project root
const dir           = __dirname;
const dist          = `${dir}/dist`;
const client        = `${cwd}/src/client`;
const modules       = `${dir}/node_modules`;
const fa            = `${modules}/@fortawesome/fontawesome-free`;
const iconsJS       = `icons.js`;
const iconsJSON     = `icons.json`;
const iconNamesJS   = `icon-names.js`;
const iconNamesJSON = `icon-names.json`;

const Paths = {
	project: {
		path: cwd
	},
	dist: {
		path: dist,
		scripts: {
			path: `${dist}/scripts`,
			icons: `${dist}/scripts/${iconsJS}`,
			iconNames: `${dist}/scripts/${iconNamesJS}`
		},
		json: {
			path: `${dist}/json`,
			icons: `${dist}/json/${iconsJSON}`,
			iconNames: `${dist}/json/${iconNamesJSON}`,
			fa: {
				path: `${dist}/json/fa`,
				icons: `${dist}/json/fa/${iconsJSON}`
			}
		}
	},
	client: {
		generated: {
			path: `${client}/scripts/generated`,
			icons: `${client}/scripts/generated/${iconsJS}`,
			iconNames: `${client}/scripts/generated/${iconNamesJS}`
		}
	},
	fa: {
		path: fa,
		sprites: `${fa}/sprites`
	}
};

// console.log(Paths);

/* Export it!
 *************/
module.exports = Paths;