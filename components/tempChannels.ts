import { VoiceState } from 'discord.js';

export function handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState, 
    channelsConfig: Record<string, ChannelConfig>, doNotRemove: string): void {
    const member = newState.member;
    const channelIdsInConfig = Object.keys(channelsConfig);

    if (oldState.channelId !== newState.channelId && newState.channelId) {
        const channelId = newState.channelId;
        const channelConfig = channelsConfig[channelId];

        if (channelConfig) {
            newState?.guild.channels.create({
                name: channelConfig.name,
                type: 2,
                parent: channelConfig.parentId,
                position: channelConfig.position,
                bitrate: 64000,
                nsfw: false,
                userLimit: channelConfig.limit,
                videoQualityMode: 1
            }).then((newVoiceChannel) => {
                member?.voice.setChannel(newVoiceChannel);
            }).catch((error) => {
                console.error(error);
            });
        }

    }

    newState.guild?.channels.cache.forEach((guildChannel) => {
        if ((guildChannel.type === 2) && !(channelIdsInConfig.includes(guildChannel.id)) && !(doNotRemove.includes(guildChannel.id))) {
            if (guildChannel.members.size === 0) {
                guildChannel.delete();
            }
        }
    })
}

interface ChannelConfig {
    name: string;
    parentId: string;
    position: number;
    limit: number;
}

export default handleVoiceStateUpdate;