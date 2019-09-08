import { Message } from 'discord.js';
import { Bot } from '../Bot';
import config from '../Settings';

export interface cmdArgs
{
	command: string; // Main command name.
	args: string[]; // Args following the command.
	message: Message; // The discord message the command was parsed from.
	bot: Bot; // The discord bot.
};

export function toArgs(message: Message, bot: Bot): cmdArgs
{
	let content: string = message.content.slice(config.commandPrefix.length);
	let split: string[] = content.split(' ');
	
	return {
		command: split[0],
		args: split.slice(1),
		message: message,
		bot: bot
	};
}