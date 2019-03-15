const msgRole = require("../informations/messagesRole.json");
module.exports = async (client, messageReaction, user) => {
	if(user.bot) return;
	if(user.id === client.user.id) return;
	let reactionMessage = msgRole.reactionMessages.find(function(rm){
		return rm.message === messageReaction.message.id;
	});
	if(reactionMessage === (null || undefined)) return;
	let reactionRole = reactionMessage.reactionRoles.find(function(rr){
		return rr.emoji === messageReaction.emoji.id || rr.emoji === `${messageReaction.emoji}`;
	});
	if(reactionRole === (null || undefined)) return;
	let member = messageReaction.message.guild.members.get(user.id);
	if(!member.roles.has(reactionRole.role)) member.addRole(reactionRole.role);
}