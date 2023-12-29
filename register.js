const { token, guildId, clientId } = require('./configs/config.json')

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { SlashCommandBuilder } = require("@discordjs/builders");

const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong!")
  .toJSON();

const stopCommand = new SlashCommandBuilder()
    .setName("work")
    .setDescription("Zapne/vypne funkci bota")
    .addIntegerOption((option) => option.setName('stav').setDescription("Nula pro vypnutí, jednička pro zapnutí").addChoices({ name: "Zapnout", value: 1 }, { name: "Vypnout", value: 0}))
    .toJSON()

const commands = [pingCommand, stopCommand];

const rest = new REST({ version: "10" }).setToken(token);


async function register () {try {
console.log("Started refreshing application (/) commands.");

await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commands }
);

console.log("Successfully reloaded application (/) commands.");
} catch (error) {
console.error(error);
}}

register()

