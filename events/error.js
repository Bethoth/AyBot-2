const chalk = require("chalk");
const moment = require("moment");
module.exports = () => {
	moment.locale("fr");
	console.log(chalk.red("\nUne erreur de connexion a eu lieu. \nHeure : "+moment().format('llll')));
};