import * as Discord from 'discord.js';
import { cmdArgs } from './cmdArgs';
import * as Message from '../util/Messages';

export default async function setpronouns(args: cmdArgs)
{
	let ch = args.message.channel;
	let member = args.message.member;
	
	if(args.args.length < 1)
	{
		ch.send(Message.Error('You have to specify *something* as your pronouns.'));
		return;
	}
	
	let pronouns: string = args.args.join(' ');
	let roleName = `Pronouns: ${pronouns}`;
	
	// Remove any existing pronoun roles.
	member.roles.forEach(async (r: Discord.Role) => {
		if(r.name.startsWith('Pronouns:'))
		{
			await member.removeRole(r, 'Pronoun change');
		}
	});
	
	let guild = member.guild;
	let existingRole = guild.roles.find(r => r.name === roleName);
	if(!existingRole)
	{
		guild.createRole({
			color: 0xffffff,
			mentionable: false,
			hoist: false,
			name: roleName,
			position: guild.roles.size
		}, 'Custom Pronouns')
		.catch(() => console.error('Could not create pronouns role!'))
		.then((r: Discord.Role) => 
					member.addRole(r)	
						.catch(() => console.error('Cannot add new pronouns role to member.'))
						.then(() => ch.send(Message.Success('Successfully set pronouns! <3'))));
	}
	else
	{
		member.addRole(existingRole).catch(() => console.error('Cannot give member existing pronouns role.'))
		.then(() => {
			ch.send(Message.Success('Successfully set pronouns! <3'));
		});
	}
}