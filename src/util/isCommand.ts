import {Message} from 'discord.js'
import config from '../Settings';

export default function isCommand(message: Message): boolean
{
	let content: string = message.content;
	//* Message must start with the command prefix and not contain whitespace afterward.
	return 	content.startsWith(config.commandPrefix) &&
			!(/\s/.test(message.content.charAt(config.commandPrefix.length + 1)) );
}