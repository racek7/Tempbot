import ping from './commands/ping'

export function commandHandler(client:any) {
    client.commands = new Map();

    const commandsArray = [ping];

    for (const command of commandsArray) {
        client.commands.set(command.data.name, command);
    }

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Došlo k chybě při provádění příkazu.', ephemeral: true });
    }
});
}

export default commandHandler;
