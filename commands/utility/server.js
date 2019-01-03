import { Command } from 'discord-akairo'
import { DateTime } from 'luxon'
import config from '../../bot.config.js'

class ServerInfoCommand extends Command {
  constructor () {
    super('server', {
      aliases: ['server'],
      category: 'Utility',
      description: {
        content: 'Get information about the Discord server.',
        usage: '!server'
      },
      channelRestriction: 'guild',
      userPermissions: ['SEND_MESSAGES']
    })
  }

  async exec (message) {
    // Server object
    const guild = await this.client.guilds.first()
    // Server icon
    const guildIcon = await guild.iconURL
    // Human-friendly server creation date
    const creationDate = await DateTime.fromISO(guild.createdAt.toISOString())
    // Total members
    const totalMembers = await guild.memberCount
    // Online members
    const onlineMembers = await guild.members.filter(member => member.presence.status === 'online').size
    // Bots on this server
    const botMembers = await guild.members.filter(member => member.user.bot).size
    // Text channels this member can access
    const textChannels = await guild.channels.filter(channel => channel.memberPermissions(message.member).has('VIEW_CHANNEL') && channel.type === 'text').size
    // Voice channels this member can access
    const voiceChannels = await guild.channels.filter(channel => channel.memberPermissions(message.member).has('VIEW_CHANNEL') && channel.type === 'voice').size
    // Initialize & populate embed
    const embed = this.client.util.embed()
    .setColor(config.colors.blue)
    .setTitle(guild.name.toUpperCase())
    .setDescription(config.serverDesc)
    .setThumbnail(guildIcon)
    .addField('❯ ID', guild.id, true)
    .addField('❯ Created', `${creationDate.toLocaleString(DateTime.DATE_SHORT)} ${creationDate.toLocaleString(DateTime.TIME_SIMPLE)} ${creationDate.offsetNameShort}`, true)
    .addField('❯ Members', `${totalMembers} • ${onlineMembers} online`, true)
    .addField('❯ Channels', `${textChannels} text • ${voiceChannels} voice`, true)
    .addField('❯ Owner', `<@${guild.ownerID}>`, true)
    .addField('❯ Region', guild.region, true)

    return message.util.send({ embed })
  }
}

export default ServerInfoCommand
