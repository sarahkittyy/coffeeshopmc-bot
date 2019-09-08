import { cmdArgs } from './cmdArgs';
import * as Discord from 'discord.js';
import config from '../Settings';

export default async function help(args: cmdArgs)
{
	let p = config.commandPrefix;
	
	let helpMsg: string = [
		`__*# CoffeeshopMC Help <3*__`,
		``,
		` * ${p}help -> Show this help menu.`,
		` * ${p}setcolor {hex} [name] -> Set your name color to a specific hex color. (Hex example: 0xffffff = white)`
	].join('\n');
	
	args.message.channel.send(helpMsg);
}