const rimraf = require('rimraf')
rimraf('./docs', () => {
	console.log('docs has been removed')
})