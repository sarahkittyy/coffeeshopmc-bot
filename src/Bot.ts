import * as Discord from 'discord.js';

export class Bot
{
	/// The bot's token
	private token: string;
	
	/// The bot client.
	private client: Discord.Client;
	
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
	 * @brief Initializes all bot client listeners.
	 */
	private initListeners()
	{
		this.client.on('disconnect', () => {
			console.error('Disconnected, attempting to reconnect...');
			this.login();
		});
		
		this.client.on('error', (error: Error) => {
			console.error(`Error occured, error: ${error.message}`);
			console.error('Attempting to reconnect...');
			this.login();
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
		});
	}
};


export default new Bot();