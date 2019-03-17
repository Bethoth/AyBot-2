const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	let embed = new Discord.RichEmbed();
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	embed.setColor("#4b5afd");
	embed.setDescription("Suus, jeej, jaaj.");
	let sausages = [
		"https://fridg-front.s3.amazonaws.com/media/products/1321.jpg",
		"https://cdn.discordapp.com/attachments/537627694788116490/547048493882277898/Z.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547048711423787048/1_saucisse_de_strasbourg.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547048817137025024/saucisse-francfort-copy.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056193105821696/9k.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056220964519951/Z.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056259942318090/280px-Saucisses_dE28099Ajoie.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056298655481873/2Q.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056345560514570/8-sa-saser-1025-8-sa-saser-1025-image_1-220617_5613.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056376044847104/images.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056492273074221/images.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056516331733032/images.png",
		"https://cdn.discordapp.com/attachments/537627694788116490/547056551865614339/images.png",
		"https://cdn.discordapp.com/attachments/515322595063627778/547066801364926464/saucisse-nature.png",
		"https://cdn.discordapp.com/attachments/515322595063627778/547066858151346184/images.png",
		"https://cdn.discordapp.com/attachments/515322595063627778/547066902741123086/images.png",
		"https://cdn.discordapp.com/attachments/515322595063627778/547066965982707742/images.png",
		"https://www.rob-brussels.be/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/8/s/8-sa-saser-1025-8-sa-saser-1025-image_1-220617_5613.jpg",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTduDcjRvLN0noVUTrRl2AQyR9GEKwsEIBdfmfyGlZ1J46kMZwd",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Saucisses_d%E2%80%99Ajoie.jpg/280px-Saucisses_d%E2%80%99Ajoie.jpg",
		"https://nodshop.com/5278-big_default/saucisse-etirable.jpg",
		"https://chevrefeuille.net/images/detailed/30/saucisse_fumee_porc_fermier.png?t=1493903965",
		"https://www.mon-cochon.com/wp-content/uploads/2017/10/chipolata.jpg",
		"https://www.drive-fermier-douaisis.fr/96-large_default/saucisse-a-chauffer.jpg",
		"https://www.academiedugout.fr/images/15709/370-274/ffffff/saucisse-strasbourg-copy.jpg?poix=50&poiy=50",
		"https://cdn.shopify.com/s/files/1/1017/4253/products/saucissedecampagne_1024x1024.JPG?v=1532517509",
		"https://www.distrimalo.com/media/saucisses_francfort__063892800_1655_13092016.jpg"
	];
	if(Math.floor(Math.random() * 1000) == 666) embed.setImage("https://cdn.discordapp.com/attachments/537627694788116490/547067318409363479/SPOILER_31Bx6VLvAqL.png");
	else embed.setImage(sausages[Math.floor(Math.random() * sausages.length)]);
	message.channel.send(embed);
}
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["jeej","jaaj"],
	serverForced: false
}

module.exports.help = {
	description: "Jeej, jaaj. (affiche une image aléatoire de saucisse).",
	utilisations: `suus`,
	exemples: ``
}