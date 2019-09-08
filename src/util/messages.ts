import * as Discord from 'discord.js';

export function MemberJoin(member: Discord.GuildMember): Discord.RichEmbed
{
	return new Discord.RichEmbed()
		.setColor(0x30ff49)
		.setTitle('A new person joined!! <3')
		.setTimestamp(new Date())
		.setDescription(`Welcome ${member.user.tag}! <3`)
		.setFooter(`There are now ${member.guild.memberCount} people on this server <3`)
		.setThumbnail(member.user.avatarURL);
}

export function MemberLeave(member: Discord.GuildMember): Discord.RichEmbed
{
	return new Discord.RichEmbed()
		.setColor(0x30ff49)
		.setTitle('A user left the server ;-;')
		.setTimestamp(new Date())
		.setDescription(`${member.user.tag} just left-- they will be missed <3`)
		.setFooter(`There are now ${member.guild.memberCount} people on this server <3`)
		.setThumbnail(member.user.avatarURL);
}