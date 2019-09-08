import fs from 'fs';

export interface Settings
{
	welcomeChannel: string; // Where to post join / leave messages.
}

let config: Settings = JSON.parse(fs.readFileSync('./config.json').toString());

export default config;