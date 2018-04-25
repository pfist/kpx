import { Command } from 'discord-akairo'
import { DateTime } from 'luxon'

class UserInfoCommand extends Command {
  constructor () {
    super('userinfo', {
      aliases: ['userinfo', 'user', 'whois', 'lookup'],
      category: 'Utility',
      description: {
        content: 'Get information about a user, or yourself if no argument is given.',
        usage: '!userinfo [user]'
      },
      userPermissions: ['VIEW_CHANNEL'],
      args: [
        {
          id: 'user',
          type: 'user',
          description: 'The user you want to look up. Can be a username or ID.',
          default: message => message.author,
          prompt: {
            start: 'Which user do you want to look up?',
            retry: 'Please enter a valid username or ID.',
            optional: true
          }
        }
      ]
    })
  }

  async exec (message, { user }) {
    const guild = await this.client.guilds.first()
    const member = await guild.member(user)
    const discordJoinDate = await DateTime.fromISO(member.user.createdAt.toISOString())
    const guildJoinDate = await DateTime.fromISO(member.joinedAt.toISOString())
    const embed = this.client.util.embed()

    embed.setColor(1406667)
    embed.setThumbnail(member.user.displayAvatarURL)
    embed.addField('Username', [member.user.tag, '\u200B'], true)
    embed.addField('ID', [member.id, '\u200B'], true)
    embed.addField('Status', [member.presence.status, '\u200B'], true)
    embed.addField('Joined Discord', [discordJoinDate.toLocaleString(DateTime.DATETIME_FULL), '\u200B'], true)
    embed.addField(`Joined ${guild.name}`, [guildJoinDate.toLocaleString(DateTime.DATETIME_FULL), '\u200B'], true)
    embed.addField('Highest Role', member.highestRole.name, true)
    embed.addField('User Type', member.user.bot ? 'Bot' : 'Human', true)

    return message.util.send(`Here's the information I have on ${member.displayName}:`, { embed })
  }
}

export default UserInfoCommand
