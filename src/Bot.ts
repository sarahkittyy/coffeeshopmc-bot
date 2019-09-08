import * as Discord from 'discord.js';
import * as Message from './util/Messages';
import config from './Settings';
import isCommand from './util/isCommand';
import { toArgs, cmdArgs } from './commands/cmdArgs';
import fs from 'fs';
import { table, commandExists, runCommand } from './commands/table';

export class Bot
{
	/// The bot's token
	private token: string;
	/// The bot client.
	private client: Discord.Client;
	
	//* Utility vars
	/// Main guild the bot is working in.
	private guild: Discord.Guild;
	/// Channel to submit join / leave messages to.
	private welcomeChannel: Discord.TextChannel;
	
	/**
	 * @brief Bot initialization.
	 */
	public constructor()
	{
		if(process.env.NODE_ENV === 'development')
		{
			this.token = process.env.DEV_TOKEN;
		}
		else
		{
			this.token = process.env.TOKEN;
		}
		
		// Create the client
		this.client = new Discord.Client();
		
		// Init the client
		this.initListeners();
		
		// Log in the client.
		this.login();
	}
	
	/**
	 * @brief Initialize the bot's settings.
	 */
	private initConfig()
	{
		//* Init main bot guild.
		this.guild = this.client.guilds.first();
		if(!this.guild)
		{
			throw Error('Could not find any guilds!');
		}
		
		//* Init welcome channel
		let tempWelcomeChannel: Discord.GuildChannel = this.guild.channels.find((c: Discord.GuildChannel) => c.name === config.welcomeChannel);
		if(!tempWelcomeChannel)
		{
			throw Error('Could not find channel ' + config.welcomeChannel);
		}
		if(tempWelcomeChannel.type !== 'text')
		{
			throw Error('Welcome channel is not a text channel!');
		}
		this.welcomeChannel = <Discord.TextChannel>tempWelcomeChannel;
		
		
	}
	
	/**
	 * @brief Initializes all bot client listeners.
	 */
	private initListeners()
	{
		//! Error handlers
		this.client.on('disconnect', () => {
			console.error('Disconnected, attempting to reconnect...');
			this.login();
		});
		this.client.on('error', (error: Error) => {
			console.error(`Error occured, error: ${error.message}`);
			console.error('Attempting to reconnect...');
			this.login();
		});
		
		//! User join / leave events
		this.client.on('guildMemberAdd', (member: Discord.GuildMember) => {
			this.welcomeChannel.send(Message.MemberJoin(member));
		});
		this.client.on('guildMemberRemove', (member: Discord.GuildMember) => {
			this.welcomeChannel.send(Message.MemberLeave(member));
		});
		
		this.client.on('message', (message: Discord.Message) => {
			if(isCommand(message))
			{
				let args: cmdArgs = toArgs(message, this);
				if(commandExists(args.command))
				{
					runCommand(args).catch(console.error)
					.then(() => {
						if(message.deletable)
						{
							message.delete();
						}
					});
				}
				else
				{
					message.channel.send(Message.UnknownCommand(args.command))
					.catch(console.error)
					.then(() => {
						if(message.deletable)
						{
							message.delete();
						}
					});
				}
			}
		});
	}
	
	/**
	 * @brief Logs the bot in incase of a disconnect or error.
	 */
	private login()
	{
		this.client.login(this.token).catch(console.error)
		.then(() => {
			console.log(`Logged in as ${this.client.user.username}!`);
		
			// Init client vars.
			this.initConfig();
		});
	}
};


export default new Bot();