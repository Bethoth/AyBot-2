const Discord = require("discord.js");
const chalk = require("chalk");
const jimp = require("jimp");
module.exports.run = async (client, message, args) => {
	try {
        let hexa = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        let arg1 = args[0];
        if(arg1 == 'random' || !arg1) {
            let color = '#';
            for(i = 0;i <= 5; i++) {
                color = String(color+hexa[Math.floor(Math.random()*hexa.length)]);
            }
            var embed = new Discord.RichEmbed()
            embed.setTitle("Couleur : "+color)
            embed.setColor(color)
            new jimp(256,128, color, (err, image) => {
                if(err) return console.log(err);
                image.write('./images/cacheClrImg.png', (err) => {
                    if(err) return console.log(err);
                })
            })
            embed.attachFile('./images/cacheClrImg.png')
            return message.channel.send(embed);
        }
        if(arg1.startsWith("#") && arg1.length == 7) { 
            arg1 = arg1.substring(1);
            hexa = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
            if(arg1.includes(hexa.some(v => arg1 === v))) {
                return message.channel.send("Veuillez mettre une couleur valable.");
            } else {
                arg1 = "#"+arg1;
                let embed = new Discord.RichEmbed();
                embed.setColor(arg1);
                embed.setTitle("Couleur hexadécimale : "+arg1)
                embed.setDescription(" ")

                new jimp(256,128, arg1, (err, image) => {
                    if(err) return console.log(err);
                    image.write('./images/cacheClrImg.png', (err) => {
                        if(err) return console.log(err);
                    })
                })
                embed.attachFile('./images/cacheClrImg.png')

                return message.channel.send(embed);
            }
        } else {
            message.channel.send("Veuillez mettre une couleur valable.");
        }
	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
    }
}
module.exports.config = {
	category: "utiles",
	name: "couleur",
	aliases: ["color","clr"]
}

module.exports.help = {
	description: "Permet de générer ou de récupérer une <couleur> héxadécimale.",
	utilisations: `couleur <color>\ncouleur random`,
	exemples: `couleur random\ncolor #4b5afd`
}