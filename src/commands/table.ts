import setcolor from './setcolor';
import help from './help';
import { cmdArgs } from './cmdArgs';

/**
 * @brief Table of all commands.
 */
let table: any = {
	setcolor: setcolor,
	help: help
};

export { table };

export function commandExists(cmd: string): boolean
{
	return <boolean>(table[cmd]);
}

export async function runCommand(args: cmdArgs)
{
	await table[args.command](args);
}