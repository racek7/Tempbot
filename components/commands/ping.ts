import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

async function execute(interaction: CommandInteraction) {
    await interaction.reply({ content: 'Pong!', ephemeral: true });
}

export default { data, execute };