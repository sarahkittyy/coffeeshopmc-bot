import fs from 'fs';

export interface Settings
{
	welcomeChannel: string; // Where to post join / leave messages.
	commandPrefix: string;
	deleteCommands: boolean; // Delete commands after user enters them.
}

let config: Settings = JSON.parse(fs.readFileSync('./config.json').toString());

export default config;