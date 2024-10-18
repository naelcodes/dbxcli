import type{Command} from 'commander';

const AVAILABLE_COMMANDS = [""] as const;

export async function commandLoader(program:Command){
    for (const command of AVAILABLE_COMMANDS) {
        const commandModule = (await import(`./commands/${command}.command.js`)).default;
        const actionModule = (await import(`./actions/${command}.action.js`)).default;
        new commandModule(new actionModule()).load(program);
    }
}


