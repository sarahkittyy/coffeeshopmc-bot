import { cmdArgs } from './cmdArgs';
import * as Message from '../util/Messages';
import config from '../Settings';
import * as Discord from 'discord.js';

export default async function setcolor(args: cmdArgs)
{
	if(args.args.length == 0)
	{
		args.message.channel.send(Message.Error(`Invalid usage. See ${config.commandPrefix}help for help.`));
	}
	
	let hex: string = args.args[0];
	let name: string = '';
	if(args.args.length == 2)
	{
		name = args.args[1];
	}
	
	// Remove any existing color roles from the user.
	let member: Discord.GuildMember = args.message.member;
	member.roles.forEach((r: Discord.Role) => {
		if(r.name.startsWith('Color.'))
		{
			member.removeRole(r, 'Color role reassignment.')
			.catch(() => console.error(`Can't remove role ${r.name} from member ${member.displayName}.`));
		}
	});
	
	// Generate the color role name.
	let colorRoleName = `Color.${name} ${hex}`;
	let guild: Discord.Guild = args.message.guild;
	
	// Check if the role exists already
	let role = guild.roles.find((r: Discord.Role) => r.name == colorRoleName);
	if(role)
	{
		member.addRole(role, 'Color role!')
		.catch(() => console.error(`Couldn't give user ${member.displayName} role.`));
	}
	else
	{
		guild.createRole({
			color: parseInt(hex),
			hoist: false,
			mentionable: false,
			name: colorRoleName,
			position: guild.roles.size
		}, 'Color role creation!')
		.catch(() => console.error('Couldn\'nt create role' + colorRoleName + '.\n'))
		.then((r: Discord.Role) => {
			member.addRole(r).catch(() => console.error(`Couldn't give user ${member.displayName} a role.`));
		})
	}
	
}