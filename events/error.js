const chalk = require("chalk");
const moment = require("moment");
module.exports = (client, error) => {
	moment.locale("fr");
	console.log(chalk.red("Une erreur a été faite quelque part, \nheure : "+moment().format('llll')+"\n\nErreur :"+error));
};