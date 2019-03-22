const Discord = require("discord.js");
function toEmbed(texte, Guild){
	let content = texte.slice(0);
	let condition = (txt,t1,t2) => txt.includes(t1)&&txt.includes(t2)&&txt.indexOf(t1)<txt.indexOf(t2);
	let rogner = (txt,t1,t2) => txt.slice(txt.indexOf(t1)+t1.length,txt.indexOf(t2));
	let replaceOne = (t1,t2,fn) => {
		if(condition(content,t1,t2)) {
			let item = rogner(content,t1,t2);
			if(typeof fn === "function") {
				content = fn(t1,t2,item);
			} else {
				content = content.replace(t1+item+t2,"");
			}
			return item;
		}
		return null;
	}
	let replaceAll = (t1,t2,fn) => {
		let items = [];
		while(condition(content,t1,t2)) {
			items.push(replaceOne(t1,t2,fn));
		}
		return items;
	}
	let args = (txt) => {
		let tmp = rogner(txt,'{','}');
		return [
			txt.replace(`{${tmp}}`,"").trim(),
			tmp.trim()
		];
	};

    content = content
        .replace(/{guild}/g,Guild.name)
        .replace(/{memberCount}/g,Guild.memberCount);  
	let title = replaceOne('t[',']t');
	let image = replaceOne('i[',']i');
	let thumb = replaceOne('l[',']l');
	let footer = replaceOne('b[',']b');
	let author = replaceOne('a[',']a');
	let color = replaceOne('c[',']c');
	replaceAll('e[',']e',function(t1,t2,item){
		return content.replace(t1+item+t2,
			`${client.emojis.find(e=>e.name.includes(item))}`
		);
	});
	let fields = replaceAll('f[',']f');
	let embed = new Discord.RichEmbed();
	if(content.includes("{time}")) {
    	content = content.replace("{time}","");
    	embed.setTimestamp();
    }
	content = content.trim();
	if(title) {
		embed.setTitle(title);
	}
    if(author) {
    	let a = args(author);
		embed.setAuthor(a[0],a[1]);
	}
	if(footer) {
		let a = args(footer);
		embed.setFooter(a[0],a[1]);
	}
	if(fields.length>25)fields=fields.slice(0,24);
	fields.forEach(function(field) {
		let a = args(field);
		embed.addField(a[0],a[1]);
	})
	if(image) {
		embed.setImage(image);
	}
	if(thumb) {
		embed.setThumbnail(thumb);
	}
	if(color) {
		embed.setColor(color);
	}
	if(content) embed.setDescription(content);
	return embed;
}

module.exports = toEmbed;

/*

Transform JSON/String into embed with multiple beacons :

{time}              Set a timestamp.
e[emojiName]e       Add an emoji in the text (with name of emoji).
t[titre]t           Set the title.
i[lien]i            Add an image.
l[lien]l            Set the thumbnail.
c[couleur]c         Set the color.
b[texte{lien}]b     Set the footer.
a[nom{lien}]a       Set the author.
f[nom{valeur}]f     Add a Field.

*/