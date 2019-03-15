const Discord = require("discord.js");
const jimp = require("jimp");
module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	let hexa = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
	let arg1 = args[0];
	if(arg1 == 'random' || !arg1) {
		let color = '#';
		for(i = 0;i <= 5; i++) {
			color = String(color+hexa[Math.floor(Math.random()*hexa.length)]);
		}
		var embed = new Discord.RichEmbed();
		embed.setTitle("Couleur : "+color);
		embed.setColor(color);
		new jimp(256,128, color, (err, image) => {
			if(err) return console.log(err);
			image.write('./images/color.png', (err) => {
				if(err) return console.log(err);
			});
		});
		embed.attachFile('./images/color.png');
		return message.channel.send(embed);
	}
	colors = ['red','yellow','green','blue','purple','black','white','grey','gray','brown',
	'rouge','orange','jaune','vert','bleu','violet','noir','blanc', 'gris','marron','rose','transparent'];

	if(colors.includes(arg1)) {
		let color = '#';
		if(arg1 == 'rouge' || arg1 == 'red') color += 'ff0000';
		else if(arg1 == 'orange') color += 'ff6600';
		else if(arg1 == 'jaune' || arg1 == 'yellow') color += 'ffff00';
		else if(arg1 == 'vert' || arg1 == 'green') color += '00ff00';
		else if(arg1 == 'bleu' || arg1 == 'blue') color += '0000ff';
		else if(arg1 == 'violet' || arg1 == 'purple') color += 'ff00ff';
		else if(arg1 == 'noir' || arg1 == 'black') color += '000000';
		else if(arg1 == 'blanc' || arg1 == 'white') color += 'ffffff';
		else if(arg1 == 'gris' || arg1 == 'grey' || arg1 == 'gray') color += '888888';
		else if(arg1 == 'marron' || arg1 == 'brown') color += '4f280a';
		else if(arg1 == 'rose') color += 'ff77cc';
		else if(arg1 == 'transparent') color += '36393e';
		var embed = new Discord.RichEmbed();
		embed.setTitle("Couleur : "+color);
		embed.setColor(color);
		await new jimp(256,128, color, (err, image) => {
			if(err) return console.log(err);
			image.write('./images/color.png', (err) => {
				if(err) return console.log(err);
			});
		});
		embed.attachFile('./images/color.png');
		return await message.channel.send(embed);
	}
	if(arg1.startsWith("#") && arg1.length == 7) { 
		arg1 = arg1.substring(1);
		hexa = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
		if(arg1.includes(hexa.some(v => arg1 === v))) {
			return await argsError("Veuillez mettre une couleur héxadécimale valable.");
		} else {
			arg1 = "#"+arg1;
			let embed = new Discord.RichEmbed();
			embed.setColor(arg1);
			embed.setTitle("Couleur hexadécimale : "+arg1);
			embed.setDescription(" ");

			new jimp(256,128, arg1, (err, image) => {
				if(err) return console.log(err);
				image.write('./images/color.png', (err) => {
					if(err) return console.log(err);
				});
			});
			embed.attachFile('./images/color.png');

			return message.channel.send(embed);
		}
	} else {
		await argsError("Veuillez mettre une couleur héxadécimaleo valable ou le nom d'une couleur valable ou `random`.");
	}
}
module.exports.config = {
	category: "utiles",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["color"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de générer ou de récupérer une <couleur> héxadécimale.",
	utilisations: `couleur <couleur>\ncouleur random`,
	exemples: `couleur random\ncolor #4b5afd`
}