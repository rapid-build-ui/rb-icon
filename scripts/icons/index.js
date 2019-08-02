/********************
 * CREATE ICON FILES
 ********************/
require('./bootstrap');
const createDist  = require('./create-dist');
const createIcons = require('./create-icons');

/* INIT
 *******/
const init = async () => { // :void
	console.log(`
		-----------------
		CREATE ICON FILES
		-----------------
	`.replace(/\t/g,'').trim().attn);

	await createDist();
	await Promise.all([
		createIcons()
	]);

	console.log(`
		-------------------
		ICON FILES CREATED!
	`.replace(/\t/g,'').trimStart().attn);
}


/* Work It!
 ***********/
init();

