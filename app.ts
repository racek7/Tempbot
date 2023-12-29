interface Config {
    token: "string";
    guildId: "string";
}

import { Client, GatewayIntentBits} from 'discord.js';
import handleVoiceStateUpdate from './components/tempChannels'
import commandHandler from './components/commandHandler'

const { token, guildId }: Config = require('./configs/config.json');
const channelsConfig = require('./configs/channels.json');
const doNotRemove = require('./configs/dnrchannels.json');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]})

client.once('ready', () => {
    console.log(`Připojeno za ${client.user?.tag}`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    handleVoiceStateUpdate(oldState, newState, channelsConfig, doNotRemove);
});

commandHandler(client);

client.login(token);
