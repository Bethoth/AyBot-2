const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const chalk = require("chalk");
const client = new Discord.Client();

module.exports.client = client;

const configBOT = require("./informations/config");

client.login(configBOT.token);

let numberFiles = 0, events = 0, commands = 0;

const countLines = function(filePath) {
    return new Promise((resolve, reject) => {
        let asciiCode = '\n'.charCodeAt(0); 
        let count = 0;
        fs.createReadStream(filePath)
            .on('error', error => reject(error))
            .on('data', chunk => {
                for (let i = 0; i < chunk.length; i++){
                    if (chunk[i] === asciiCode){
                        count++;
                    }
                }
            })
            .on('end', () => resolve(count));
    });
};


const countLinesDirectory = function(directory) {
    return new Promise((resolve, reject) => {
        let promises = [];
        fs.readdir(directory, (err, files) => {
            if (err){
                reject(err); return;
            }
            files.forEach(file => {
				if(!file.endsWith(".js")) return;
                promises.push(countLines(directory + file));
            });
 
            Promise.all(promises).then(arrayCounts => {
                return arrayCounts.reduce((accumulator, currentValue) => accumulator + currentValue);
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    });
};
 
const countLinesDirectories = function(directories) {
    return new Promise((resolve, reject) => {
        let promises = [];
        directories.forEach(directory => {
            promises.push(countLinesDirectory(directory));
        });
 
        Promise.all(promises).then(arrayCounts => {
            return arrayCounts.reduce((accumulator, currentValue) => accumulator + currentValue);
        }).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

const directories = ["./functions/", "./events/","./commands/wip/","./commands/owner/","./commands/administration/","./commands/moderation/","./commands/information/","./commands/utility/","./commands/fun/","./"];
const dirs = ["./commands/wip","./commands/owner","./commands/administration","./commands/moderation","./commands/information","./commands/utility","./commands/fun"];


countLinesDirectories(directories).then(count => {
	configBOT.linesOfCode = count;
	fs.writeFile("./informations/config.json", JSON.stringify(configBOT,null, '\t'), (err) => { if (err) console.log(err); })
}).catch(function(err){
	console.log(err);
});


fs.readdir("./informations/", (err, files) => {
	console.log(chalk.red.bold("\n\nLancement du bot.\n\n"));
	if(err) return console.error(err);
	files.forEach(file => {
		if(!file.endsWith(".json")) return;
		console.log(chalk.white(`Fichier externe : `)+chalk.redBright(`${file}`));
	});
	numberFiles += files.length-2;
});
fs.readdir("./images/", (err,files) => {
	if(err) return console.error(err);
	files.forEach(file => {
		console.log(chalk.white(`Fichier externe : `)+chalk.redBright(`${file}`));
	});
	numberFiles += files.length;
});
fs.readdir("./functions/", (err,files) => {
	if(err) return console.error(err);
	console.log("");
	files.forEach(file => {
		console.log(chalk.white(`Fonction externe : `)+chalk.redBright(`${file}`));
	});
	numberFiles += files.length;
});

fs.readdir("./events/", (err, files) => {
	if(err) return console.error(err);
	console.log(`\nÉvènements : (`+chalk.magenta.bold(`${files.length}`)+")");
	events = files.length;
	files.forEach(file => {
		if(!file.endsWith(".js")) return;
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];

		console.log(chalk.white(`Chargement de l'évènement : `)+chalk.redBright(`${eventName}`));
	});

	numberFiles+=files.length;
});

client.commands = new Enmap();
client.aliases = new Enmap();

dirs.forEach((directory, index) => {
	fs.readdir(directory, (err, files) => {
		if(err) return console.error(err);
		console.log(`\nCommandes : (`+chalk.magenta.bold(`${files.length}`)+")");
		commands += files.length;
		
		files.forEach(file => {
			
			if(!file.endsWith("js")) return;
			let props = require(`${directory}/${file}`);
			let commandName = props.config.name;
			client.commands.set(commandName, props);
			props.config.aliases.forEach(alias => {
				client.aliases.set(alias, props.config.name);
			});

			let aliases = props.config.aliases.map(e => e.toString()).join(", ");
			console.log(chalk.white(`Chargement de la commande : `)+chalk.redBright(`${commandName}`));
			console.log(chalk.white(`Raccourcis : `)+chalk.cyan(`${aliases}\n`));
		});
		numberFiles += files.length;
		if(index >= dirs.length-1) console.log(chalk.white(`Chargement total de `)+chalk.magenta.bold(`${numberFiles}`)+chalk.white(` fichiers dont ${chalk.magenta.bold(commands)} commandes et ${chalk.magenta.bold(events)} évènements.`));
	});
});