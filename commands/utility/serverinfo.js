import { Command } from 'discord-akairo'
import { DateTime } from 'luxon'

class ServerInfoCommand extends Command {
  constructor () {
    super('serverinfo', {
      aliases: ['serverinfo', 'server'],
      category: 'Utility',
      description: {
        content: 'Get information about the Discord server.',
        usage: '!server'
      },
      userPermissions: ['VIEW_CHANNEL']
    })
  }

  async exec (message) {
    const guild = await this.client.guilds.first()
    const creationDate = await DateTime.fromISO(guild.createdAt.toISOString())
    const embed = this.client.util.embed()

    embed.setColor(1406667)
    embed.setAuthor(guild.name, guild.iconURL)
    embed.setThumbnail(guild.iconURL)
    embed.setDescription(['Enter a server description here', '\u200B'])
    embed.addField('ID', [guild.id, '\u200B'], true)
    embed.addField('Owner', [guild.owner.user.tag, '\u200B'], true)
    embed.addField('Members', [`${guild.memberCount} (${guild.members.filter(member => member.presence.status === 'online').size} online)`, '\u200B'], true)
    embed.addField('Region', [guild.region, '\u200B'], true)
    embed.addField('Created', creationDate.toLocaleString(DateTime.DATETIME_FULL))

    return message.util.send({ embed })
  }
}

export default ServerInfoCommand
